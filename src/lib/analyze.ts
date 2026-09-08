import type { Locale } from "./i18n";
import { plain, type Line } from "./i18n";
import { exerciseName } from "./i18n/content";
import type { Effort, LiftSet, SessionAdjustment, SessionAnalysis, SessionLog } from "./types";
import { emptySets, templateById } from "./workouts";

function num(value: string) {
  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function mean(values: number[]) {
  if (values.length === 0) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function parseRange(reps: string | undefined) {
  if (!reps) return null;
  const timed = /\bs\b|sec|秒/i.test(reps);
  const match = reps.replace(/,/g, ".").match(/(\d+(?:\.\d+)?)\s*[–\-àto]+\s*(\d+(?:\.\d+)?)/i);
  if (!match) return null;
  return { min: Number(match[1]), max: Number(match[2]), timed };
}

function usedSets(sets: LiftSet[]) {
  const done = sets.filter((set) => set.done);
  if (done.length) return done;
  return sets.filter((set) => num(set.kg) !== null || num(set.reps) !== null);
}

function isNeck(name: string) {
  return /neck|cou|颈|頸/i.test(name);
}

function isConservative(name: string) {
  return /squat|deadlift|rdl|romanian|hip thrust|rowing|row|soulevé|硬拉|深蹲|划船|臀推/i.test(name);
}

function bumpKg(kg: number, direction: 1 | -1, conservative: boolean) {
  const step = kg >= 20 ? 2.5 : kg >= 10 ? 2 : 1;
  const extra = !conservative && direction > 0 && kg >= 40 ? step : 0;
  return Math.max(0, kg + direction * (step + extra));
}

function fmtKg(locale: Locale, kg: number) {
  const rounded = Math.round(kg * 2) / 2;
  const text =
    rounded % 1 === 0 ? String(rounded) : rounded.toFixed(1).replace(".", locale === "fr" ? "," : ".");
  return text;
}

function label(locale: Locale, name: string) {
  const text = exerciseName(locale, name);
  return typeof text === "string" ? text : text.zh;
}

function txt(locale: Locale, line: Line) {
  return plain(locale, line);
}

function amountWeight(locale: Locale, from: number, to: number) {
  const delta = to - from;
  const sign = delta >= 0 ? "+" : "−";
  return `${sign}${fmtKg(locale, Math.abs(delta))} kg`;
}

function stats(sets: LiftSet[]) {
  const used = usedSets(sets);
  const kgs = used.map((set) => num(set.kg)).filter((value): value is number => value !== null);
  const reps = used.map((set) => num(set.reps)).filter((value): value is number => value !== null);
  return {
    used,
    done: sets.filter((set) => set.done).length,
    total: sets.length,
    kgs,
    reps,
    avgKg: mean(kgs),
    minReps: reps.length ? Math.min(...reps) : null,
    maxReps: reps.length ? Math.max(...reps) : null,
  };
}

function effortOf(sets: LiftSet[]): Effort | null {
  const stamps = usedSets(sets)
    .map((set) => set.difficulty)
    .filter((value): value is Effort => value !== null);
  if (stamps.length === 0) return null;
  const hard = stamps.filter((value) => value === "hard").length;
  const easy = stamps.filter((value) => value === "easy").length;
  if (hard * 2 >= stamps.length) return "hard";
  if (easy * 2 >= stamps.length && hard === 0) return "easy";
  return "normal";
}

function lastFeel(sets: LiftSet[]): Effort | null {
  const used = usedSets(sets);
  for (let i = used.length - 1; i >= 0; i -= 1) {
    if (used[i].difficulty) return used[i].difficulty;
  }
  return effortOf(sets);
}

function adjustExercise(
  locale: Locale,
  name: string,
  current: LiftSet[],
  previous: LiftSet[] | undefined,
  range: { min: number; max: number; timed: boolean } | null,
): SessionAdjustment {
  const now = stats(current);
  const before = previous ? stats(previous) : null;
  const conservative = isConservative(name);

  if (now.done === 0 && now.used.length === 0) {
    return {
      exercise: label(locale, name),
      change: "keep",
      amount: txt(locale, {
        fr: "identique",
        en: "same",
        zh: "保持",
        py: "bǎo chí",
      }),
      reason: txt(locale, {
        fr: "Aucune série notée. Reprends la même charge.",
        en: "No sets logged. Keep the same load.",
        zh: "没有记下组数。下次用同样的重量。",
        py: "méi yǒu jì xià zǔ shù. xià cì yòng tóng yàng de zhòng liàng.",
      }),
    };
  }

  if (now.done > 0 && now.done < now.total) {
    return {
      exercise: label(locale, name),
      change: "keep",
      amount: txt(locale, {
        fr: "identique",
        en: "same",
        zh: "保持",
        py: "bǎo chí",
      }),
      reason: txt(locale, {
        fr: `${now.done}/${now.total} séries faites. Termine toutes les séries avant de monter.`,
        en: `${now.done}/${now.total} sets done. Finish every set before adding load.`,
        zh: `做了 ${now.done}/${now.total} 组。先做满所有组，再加重量。`,
        py: `zuò le ${now.done}/${now.total} zǔ. xiān zuò mǎn suǒ yǒu zǔ, zài jiā zhòng liàng.`,
      }),
    };
  }

  if (isNeck(name)) {
    return {
      exercise: label(locale, name),
      change: "keep",
      amount: txt(locale, {
        fr: "très léger",
        en: "very light",
        zh: "非常轻",
        py: "fēi cháng qīng",
      }),
      reason: txt(locale, {
        fr: "Cou : charge très légère, 15–20 reps, sans douleur.",
        en: "Neck: keep it very light, 15–20 reps, no pain.",
        zh: "颈部：重量非常轻，15 到 20 次，不能疼。",
        py: "jǐng bù: zhòng liàng fēi cháng qīng, 15 dào 20 cì, bù néng téng.",
      }),
    };
  }

  const prevKg = before?.avgKg ?? null;
  const kg = now.avgKg;
  const minReps = now.minReps;
  const maxReps = now.maxReps;
  const effort = effortOf(current);
  const feel = lastFeel(current);

  if (kg !== null && prevKg !== null && kg < prevKg - 0.4) {
    const next = bumpKg(kg, -1, conservative);
    return {
      exercise: label(locale, name),
      change: "drop_weight",
      amount: amountWeight(locale, kg, next),
      reason: txt(locale, {
        fr: `Charge en baisse (${fmtKg(locale, prevKg)} → ${fmtKg(locale, kg)} kg). On recule d’un cran, 1–3 reps en réserve.`,
        en: `Load dropped (${fmtKg(locale, prevKg)} → ${fmtKg(locale, kg)} kg). Step back one increment, leave 1–3 reps in reserve.`,
        zh: `重量下降（${fmtKg(locale, prevKg)} → ${fmtKg(locale, kg)} 公斤）。先减一档，每组留 1 到 3 次余力。`,
        py: `zhòng liàng xià jiàng. xiān jiǎn yì dǎng, měi zǔ liú 1 dào 3 cì yú lì.`,
      }),
    };
  }

  if (effort === "hard" && kg !== null && range && minReps !== null && minReps < range.min) {
    const next = bumpKg(kg, -1, conservative);
    return {
      exercise: label(locale, name),
      change: "drop_weight",
      amount: amountWeight(locale, kg, next),
      reason: txt(locale, {
        fr: `Tampon dur et reps sous ${range.min} (min ${minReps}). Recule à ${fmtKg(locale, next)} kg.`,
        en: `Stamped hard and reps under ${range.min} (low ${minReps}). Drop to ${fmtKg(locale, next)} kg.`,
        zh: `标记为吃力，次数低于 ${range.min}（最低 ${minReps}）。减到 ${fmtKg(locale, next)} 公斤。`,
        py: `biāo jì wéi chī lì, cì shù piān dī. xiān jiǎn zhòng liàng.`,
      }),
    };
  }

  if (range?.timed && minReps !== null && maxReps !== null) {
    if (minReps >= range.max) {
      return {
        exercise: label(locale, name),
        change: "add_reps",
        amount: locale === "fr" ? "+5–10 s" : locale === "en" ? "+5–10 s" : "+5 到 10 秒",
        reason: txt(locale, {
          fr: `Toutes les séries à ${minReps} s, haut de la fourchette ${range.min}–${range.max} s. Ajoute 5–10 s.`,
          en: `Every set hit ${minReps} s, top of ${range.min}–${range.max} s. Add 5–10 s.`,
          zh: `每组都到 ${minReps} 秒，已到 ${range.min} 到 ${range.max} 秒上限。下次加 5 到 10 秒。`,
          py: `měi zǔ dōu dào ${minReps} miǎo. xià cì jiā 5 dào 10 miǎo.`,
        }),
      };
    }
    if (maxReps < range.min) {
      return {
        exercise: label(locale, name),
        change: "add_reps",
        amount: locale === "fr" ? "+5–10 s" : locale === "en" ? "+5–10 s" : "+5 到 10 秒",
        reason: txt(locale, {
          fr: `Temps encore bas (${maxReps} s, cible ${range.min}–${range.max} s). Allonge un peu, sans aller à l’échec.`,
          en: `Time is still low (${maxReps} s, target ${range.min}–${range.max} s). Add a little, not to failure.`,
          zh: `时间还偏短（${maxReps} 秒，目标 ${range.min} 到 ${range.max} 秒）。稍微加长，不要做到力竭。`,
          py: `shí jiān hái piān duǎn. shāo wēi jiā cháng, bú yào zuò dào lì jié.`,
        }),
      };
    }
    return {
      exercise: label(locale, name),
      change: "keep",
      amount: txt(locale, { fr: "identique", en: "same", zh: "保持", py: "bǎo chí" }),
      reason: txt(locale, {
        fr: `Temps dans la fourchette ${range.min}–${range.max} s. Garde le même protocole.`,
        en: `Time is inside ${range.min}–${range.max} s. Keep the same protocol.`,
        zh: `时间在 ${range.min} 到 ${range.max} 秒之间。下次同样做。`,
        py: `shí jiān zài qū jiān lǐ. xià cì tóng yàng zuò.`,
      }),
    };
  }

  if (range && minReps !== null && maxReps !== null && minReps >= range.max && kg !== null) {
    if (effort === "hard" || feel === "hard") {
      return {
        exercise: label(locale, name),
        change: "keep",
        amount: txt(locale, { fr: "identique", en: "same", zh: "保持", py: "bǎo chí" }),
        reason: txt(locale, {
          fr: `Haut de fourchette (${minReps} reps) mais tampon dur. Même charge, 1–3 reps en réserve.`,
          en: `Top of the range (${minReps} reps) but stamped hard. Same load, leave 1–3 reps in reserve.`,
          zh: `次数到了上限（${minReps} 次），但标记为吃力。重量不变，留 1 到 3 次余力。`,
          py: `cì shù dào le shàng xiàn, dàn biāo jì wéi chī lì. zhòng liàng bú biàn.`,
        }),
      };
    }
    const next = bumpKg(kg, 1, conservative);
    return {
      exercise: label(locale, name),
      change: "add_weight",
      amount: amountWeight(locale, kg, next),
      reason: txt(locale, {
        fr:
          effort === "easy"
            ? `Toutes les séries à ${minReps} reps, ressenti facile. Prochaine fois : ${fmtKg(locale, next)} kg, 1–3 reps en réserve.`
            : `Toutes les séries à ${minReps} reps (haut de ${range.min}–${range.max}). Prochaine fois : ${fmtKg(locale, next)} kg, 1–3 reps en réserve.`,
        en:
          effort === "easy"
            ? `Every set hit ${minReps} reps and felt easy. Next time: ${fmtKg(locale, next)} kg, leave 1–3 reps in reserve.`
            : `Every set hit ${minReps} reps (top of ${range.min}–${range.max}). Next time: ${fmtKg(locale, next)} kg, leave 1–3 reps in reserve.`,
        zh:
          effort === "easy"
            ? `每组都做满 ${minReps} 次，而且感觉轻松。下次用 ${fmtKg(locale, next)} 公斤，留 1 到 3 次余力。`
            : `每组都做满 ${minReps} 次（区间 ${range.min} 到 ${range.max} 的上限）。下次用 ${fmtKg(locale, next)} 公斤，留 1 到 3 次余力。`,
        py:
          effort === "easy"
            ? `měi zǔ dōu zuò mǎn ${minReps} cì, ér qiě gǎn jué qīng sōng. xià cì jiā zhòng liàng.`
            : `měi zǔ dōu zuò mǎn ${minReps} cì. xià cì yòng ${fmtKg(locale, next)} gōng jīn.`,
      }),
    };
  }

  if (range && minReps !== null && minReps < range.max) {
    return {
      exercise: label(locale, name),
      change: "add_reps",
      amount: locale === "fr" ? "+1–2 reps" : locale === "en" ? "+1–2 reps" : "+1 到 2 次",
      reason: txt(locale, {
        fr:
          effort === "easy"
            ? `Ressenti facile, reps encore dans ${range.min}–${range.max} (min ${minReps}). D’abord +1–2 reps, pas le poids.`
            : `Reps encore dans ${range.min}–${range.max} (min ${minReps}). D’abord +1–2 reps, pas le poids.`,
        en:
          effort === "easy"
            ? `Felt easy, reps still inside ${range.min}–${range.max} (low ${minReps}). Add 1–2 reps first, not load.`
            : `Reps still inside ${range.min}–${range.max} (low ${minReps}). Add 1–2 reps first, not load.`,
        zh:
          effort === "easy"
            ? `感觉轻松，次数还在 ${range.min} 到 ${range.max}（最低 ${minReps}）。先加 1 到 2 次，不加重量。`
            : `次数还在 ${range.min} 到 ${range.max}（最低 ${minReps}）。先加 1 到 2 次，不加重量。`,
        py: `cì shù hái zài qū jiān lǐ. xiān jiā 1 dào 2 cì, bù jiā zhòng liàng.`,
      }),
    };
  }

  const prevMinReps = before?.minReps ?? null;
  if (kg !== null && prevKg !== null && minReps !== null && prevMinReps !== null && minReps + 1.5 < prevMinReps) {
    return {
      exercise: label(locale, name),
      change: "keep",
      amount: txt(locale, { fr: "identique", en: "same", zh: "保持", py: "bǎo chí" }),
      reason: txt(locale, {
        fr: `Reps en baisse vs la séance précédente. Garde ${fmtKg(locale, kg)} kg, 1–3 reps en réserve.`,
        en: `Reps dropped vs last time. Keep ${fmtKg(locale, kg)} kg, leave 1–3 reps in reserve.`,
        zh: `次数比上次少。保持 ${fmtKg(locale, kg)} 公斤，每组留 1 到 3 次余力。`,
        py: `cì shù bǐ shàng cì shǎo. bǎo chí ${fmtKg(locale, kg)} gōng jīn.`,
      }),
    };
  }

  return {
    exercise: label(locale, name),
    change: "keep",
    amount: txt(locale, { fr: "identique", en: "same", zh: "保持", py: "bǎo chí" }),
    reason: txt(locale, {
      fr: conservative
        ? "Mouvement lourd (lombaires déjà chargés). Même charge, 1–3 reps en réserve."
        : "Pas encore au haut de la fourchette partout. Même charge.",
      en: conservative
        ? "Heavy lift (lower back already loaded). Same weight, leave 1–3 reps in reserve."
        : "Not yet at the top of the range on every set. Same load.",
      zh: conservative
        ? "重动作（腰已经在发力）。重量不变，每组留 1 到 3 次余力。"
        : "还没有每组都做到区间上限。重量先不变。",
      py: conservative
        ? "zhòng dòng zuò. zhòng liàng bú biàn, měi zǔ liú 1 dào 3 cì yú lì."
        : "hái méi yǒu měi zǔ dōu zuò dào shàng xiàn. zhòng liàng xiān bú biàn.",
    }),
  };
}

function summarize(locale: Locale, name: string, adjustments: SessionAdjustment[]) {
  const addW = adjustments.filter((item) => item.change === "add_weight").length;
  const addR = adjustments.filter((item) => item.change === "add_reps").length;
  const drop = adjustments.filter((item) => item.change === "drop_weight").length;
  return txt(locale, {
    fr:
      drop > 0
        ? `${name} : ${drop} mouvement(s) en baisse. Recule d’un cran, 1–3 reps en réserve. Ailleurs, ${addW} à monter, ${addR} à pousser en reps.`
        : addW > 0
          ? `${name} : ${addW} mouvement(s) au haut de la fourchette → +charge. ${addR} encore en reps. Lombaires : rester conservateur.`
          : `${name} enregistrée. Prochaine fois : +1–2 reps là où tu n’es pas au max, même charge ailleurs. 1–3 reps en réserve.`,
    en:
      drop > 0
        ? `${name}: ${drop} lift(s) went down. Step back one increment, leave 1–3 reps in reserve. Elsewhere, add load on ${addW}, add reps on ${addR}.`
        : addW > 0
          ? `${name}: ${addW} lift(s) hit the top of the range → add load. ${addR} still need more reps. Stay conservative on the lower back.`
          : `${name} logged. Next time: add 1–2 reps where you are not at the top, same load elsewhere. Leave 1–3 reps in reserve.`,
    zh:
      drop > 0
        ? `${name}：有 ${drop} 个动作重量下降。先减一档，每组留 1 到 3 次余力。另外 ${addW} 个可加重量，${addR} 个先加次数。`
        : addW > 0
          ? `${name}：有 ${addW} 个动作做到区间上限，下次加重量。${addR} 个还要先加次数。腰部保持保守。`
          : `${name} 已记录。下次：没到上限的动作加 1 到 2 次，其他重量不变。每组留 1 到 3 次余力。`,
    py:
      drop > 0
        ? `${name}: yǒu dòng zuò xià jiàng. xiān jiǎn yì dǎng.`
        : addW > 0
          ? `${name}: yǒu dòng zuò dào shàng xiàn, xià cì jiā zhòng liàng.`
          : `${name} yǐ jì lù. xià cì xiān jiā cì shù, měi zǔ liú 1 dào 3 cì yú lì.`,
  });
}

export function analyzeSession(
  session: SessionLog,
  previous: SessionLog | null,
  locale: Locale,
): SessionAnalysis {
  const template = templateById(session.focus);
  const prevByName = new Map((previous?.exercises ?? []).map((exercise) => [exercise.name, exercise.sets]));
  const adjustments = session.exercises.map((exercise) => {
    const meta = template?.exercises.find((item) => item.name === exercise.name);
    return {
      ...adjustExercise(
        locale,
        exercise.name,
        exercise.sets,
        prevByName.get(exercise.name),
        parseRange(meta?.reps),
      ),
      key: exercise.name,
    };
  });
  return {
    summary: summarize(locale, session.name, adjustments),
    adjustments,
  };
}

export function previousCompleted(
  sessions: SessionLog[],
  templateId: string,
  exceptId?: string,
) {
  return (
    sessions.find(
      (session) =>
        session.focus === templateId &&
        session.completed &&
        session.id !== exceptId,
    ) ?? null
  );
}

export function adjustmentFor(
  session: SessionLog | null | undefined,
  name: string,
  locale: Locale,
) {
  return (
    session?.analysis?.adjustments.find(
      (item) =>
        item.key === name ||
        item.exercise === name ||
        item.exercise === label(locale, name),
    ) ?? null
  );
}

function fmtInputKg(kg: number) {
  const rounded = Math.round(kg * 2) / 2;
  return rounded % 1 === 0 ? String(rounded) : String(rounded);
}

export function applyChangeToLoad(
  change: SessionAdjustment["change"],
  kg: string,
  reps: string,
  conservative: boolean,
) {
  const k = num(kg);
  const r = num(reps);
  if (change === "add_weight" && k !== null) {
    return { kg: fmtInputKg(bumpKg(k, 1, conservative)), reps };
  }
  if (change === "drop_weight" && k !== null) {
    return { kg: fmtInputKg(bumpKg(k, -1, conservative)), reps };
  }
  if (change === "add_reps" && r !== null) {
    return { kg, reps: String(r + 1) };
  }
  if (change === "drop_reps" && r !== null) {
    return { kg, reps: String(Math.max(1, r - 1)) };
  }
  return { kg, reps };
}

export function seedSetsFromPrevious(
  name: string,
  setCount: number,
  previous: SessionLog | null,
  locale: Locale,
) {
  const last = previous?.exercises.find((exercise) => exercise.name === name);
  const adj = adjustmentFor(previous, name, locale);
  const conservative = isConservative(name);
  return emptySets(setCount).map((set, index) => {
    const src = last?.sets[index] ?? last?.sets.at(-1);
    const kg = src?.kg ?? "";
    const reps = src?.reps ?? "";
    const next = adj
      ? applyChangeToLoad(adj.change, kg, reps, conservative)
      : { kg, reps };
    return { ...set, ...next };
  });
}
