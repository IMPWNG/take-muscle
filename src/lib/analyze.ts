import type { Locale } from "./i18n";
import { plain, type Line } from "./i18n";
import { exerciseName } from "./i18n/content";
import type {
  AdjustmentChange,
  Effort,
  LiftKind,
  LiftSet,
  SessionAdjustment,
  SessionAnalysis,
  SessionExerciseLog,
  SessionLog,
} from "./types";
import { emptySets, liftByName, templateById } from "./workouts";

function num(value: string) {
  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function mean(values: number[]) {
  if (values.length === 0) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function parseRange(prescription: string | undefined) {
  if (!prescription) return null;
  const timed = /\bs\b|sec|秒/i.test(prescription);
  const match = prescription.replace(/,/g, ".").match(/(\d+(?:\.\d+)?)\s*[–\-àto]+\s*(\d+(?:\.\d+)?)/i);
  if (!match) return null;
  return { min: Number(match[1]), max: Number(match[2]), timed };
}

function filledSet(set: LiftSet, kind: LiftKind) {
  if (kind === "timed") return num(set.seconds) !== null || set.done;
  if (kind === "bodyweight") return num(set.reps) !== null || set.done;
  return num(set.kg) !== null || num(set.reps) !== null || set.done;
}

function usedSets(sets: LiftSet[], kind: LiftKind) {
  const filled = sets.filter((set) => filledSet(set, kind));
  if (filled.length === sets.length) return sets;
  const done = sets.filter((set) => set.done);
  if (done.length) return done;
  return filled;
}

function isNeck(name: string) {
  return /neck|cou|颈|頸/i.test(name);
}

function isConservative(name: string) {
  return /squat|deadlift|rdl|romanian|hip thrust|rowing|row|soulevé|硬拉|深蹲|划船|臀推/i.test(name);
}

function bumpKg(kg: number, direction: 1 | -1) {
  const step = kg >= 20 ? 2.5 : kg >= 10 ? 2 : 1;
  return Math.max(0, Math.round((kg + direction * step) * 2) / 2);
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

function stats(sets: LiftSet[], kind: LiftKind) {
  const used = usedSets(sets, kind);
  const kgs = used.map((set) => num(set.kg)).filter((value): value is number => value !== null);
  const reps = used.map((set) => num(set.reps)).filter((value): value is number => value !== null);
  const seconds = used.map((set) => num(set.seconds)).filter((value): value is number => value !== null);
  return {
    used,
    done: sets.filter((set) => set.done).length,
    total: sets.length,
    kgs,
    reps,
    seconds,
    avgKg: mean(kgs),
    minReps: reps.length ? Math.min(...reps) : null,
    maxReps: reps.length ? Math.max(...reps) : null,
    minSec: seconds.length ? Math.min(...seconds) : null,
    maxSec: seconds.length ? Math.max(...seconds) : null,
  };
}

function effortOf(sets: LiftSet[], kind: LiftKind): Effort | null {
  const stamps = usedSets(sets, kind)
    .map((set) => set.difficulty)
    .filter((value): value is Effort => value !== null);
  if (stamps.length === 0) return null;
  const hard = stamps.filter((value) => value === "hard").length;
  const easy = stamps.filter((value) => value === "easy").length;
  if (hard * 2 >= stamps.length) return "hard";
  if (easy * 2 >= stamps.length && hard === 0) return "easy";
  return "normal";
}

function lastFeel(sets: LiftSet[], kind: LiftKind): Effort | null {
  const used = usedSets(sets, kind);
  for (let i = used.length - 1; i >= 0; i -= 1) {
    if (used[i].difficulty) return used[i].difficulty;
  }
  return effortOf(sets, kind);
}

function keep(
  locale: Locale,
  name: string,
  amount: Line,
  reason: Line,
): SessionAdjustment {
  return {
    exercise: label(locale, name),
    change: "keep",
    amount: txt(locale, amount),
    reason: txt(locale, reason),
  };
}

function same(locale: Locale): Line {
  return { fr: "identique", en: "same", zh: "保持", py: "bǎo chí" };
}

function adjustTimed(
  locale: Locale,
  name: string,
  current: LiftSet[],
  range: { min: number; max: number } | null,
): SessionAdjustment {
  const now = stats(current, "timed");
  const effort = effortOf(current, "timed");
  const feel = lastFeel(current, "timed");
  const hard = effort === "hard" || feel === "hard";
  const minSec = now.minSec;
  const maxSec = now.maxSec;

  if (now.used.length === 0) {
    return keep(locale, name, same(locale), {
      fr: "Aucun temps noté. Reprends le même hold, sans charge.",
      en: "No hold logged. Keep the same time. Do not add load.",
      zh: "没有记下时间。下次同样撑，不要加重量。",
      py: "méi yǒu jì xià shí jiān. xià cì tóng yàng chēng, bú yào jiā zhòng liàng.",
    });
  }

  if (now.used.length < now.total) {
    return keep(locale, name, same(locale), {
      fr: `${now.used.length}/${now.total} holds notés. Note le temps manquant avant d’allonger.`,
      en: `${now.used.length}/${now.total} holds logged. Log the missing time before adding seconds.`,
      zh: `记了 ${now.used.length}/${now.total} 组。先把缺的时间补上，再加秒。`,
      py: `jì le ${now.used.length}/${now.total} zǔ. xiān bǔ shàng, zài jiā miǎo.`,
    });
  }

  if (hard && minSec !== null && range && minSec < range.min) {
    return {
      exercise: label(locale, name),
      change: "drop_time",
      amount: locale === "fr" ? "−5 s" : locale === "en" ? "−5 s" : "−5 秒",
      reason: txt(locale, {
        fr: `Hold tamponné dur et sous ${range.min} s (min ${minSec} s). Recule de 5 s. Pas de kg, pas de reps.`,
        en: `Hold stamped hard and under ${range.min} s (low ${minSec} s). Drop 5 s. No kg, no reps.`,
        zh: `支撑标记为吃力，而且低于 ${range.min} 秒（最短 ${minSec} 秒）。减 5 秒。不要写公斤或次数。`,
        py: `zhī chēng tài nán. jiǎn 5 miǎo. bú yào xiě gōng jīn huò cì shù.`,
      }),
    };
  }

  if (hard) {
    return keep(locale, name, same(locale), {
      fr: `Hold tamponné dur${minSec !== null ? ` (${minSec} s)` : ""}. Même temps. Ne pas allonger, ne pas ajouter de charge.`,
      en: `Hold stamped hard${minSec !== null ? ` (${minSec} s)` : ""}. Same time. Do not add seconds or load.`,
      zh: `支撑标记为吃力${minSec !== null ? `（${minSec} 秒）` : ""}。时间不变。不要加秒，也不要加重量。`,
      py: `zhī chēng tài nán. shí jiān bú biàn.`,
    });
  }

  if (range && minSec !== null && minSec >= range.max) {
    return {
      exercise: label(locale, name),
      change: "add_time",
      amount: locale === "fr" ? "+5 s" : locale === "en" ? "+5 s" : "+5 秒",
      reason: txt(locale, {
        fr: `Toutes les séries à ${minSec} s, haut de ${range.min}–${range.max} s, pas dur. Prochaine fois : +5 s. Pas de kg.`,
        en: `Every hold hit ${minSec} s, top of ${range.min}–${range.max} s, not hard. Next time: +5 s. No kg.`,
        zh: `每组都撑到 ${minSec} 秒，已到 ${range.min} 到 ${range.max} 秒上限，而且不吃力。下次加 5 秒。不要加重量。`,
        py: `měi zǔ dōu chēng dào ${minSec} miǎo. xià cì jiā 5 miǎo.`,
      }),
    };
  }

  if (range && maxSec !== null && maxSec < range.min) {
    return {
      exercise: label(locale, name),
      change: "add_time",
      amount: locale === "fr" ? "+5 s" : locale === "en" ? "+5 s" : "+5 秒",
      reason: txt(locale, {
        fr: `Temps encore bas (${maxSec} s, cible ${range.min}–${range.max} s). Allonge de 5 s, sans aller à l’échec.`,
        en: `Time is still low (${maxSec} s, target ${range.min}–${range.max} s). Add 5 s, not to failure.`,
        zh: `时间还偏短（${maxSec} 秒，目标 ${range.min} 到 ${range.max} 秒）。加 5 秒，不要撑到力竭。`,
        py: `shí jiān hái piān duǎn. jiā 5 miǎo.`,
      }),
    };
  }

  return keep(locale, name, same(locale), {
    fr: `Temps dans la fourchette${range ? ` ${range.min}–${range.max} s` : ""}. Même hold.`,
    en: `Time is inside the range${range ? ` ${range.min}–${range.max} s` : ""}. Same hold.`,
    zh: `时间在区间里${range ? `（${range.min} 到 ${range.max} 秒）` : ""}。下次同样撑。`,
    py: `shí jiān zài qū jiān lǐ. xià cì tóng yàng chēng.`,
  });
}

function adjustExercise(
  locale: Locale,
  exercise: SessionExerciseLog,
  previous: LiftSet[] | undefined,
  prescription: string | undefined,
): SessionAdjustment {
  const kind = exercise.kind;
  const name = exercise.name;
  const range = parseRange(prescription);
  const now = stats(exercise.sets, kind);
  const before = previous ? stats(previous, kind) : null;

  if (kind === "timed") {
    return { ...adjustTimed(locale, name, exercise.sets, range), key: exercise.id };
  }

  if (now.done === 0 && now.used.length === 0) {
    return keep(locale, name, same(locale), {
      fr: "Aucune série notée. Reprends la même charge.",
      en: "No sets logged. Keep the same load.",
      zh: "没有记下组数。下次用同样的重量。",
      py: "méi yǒu jì xià zǔ shù. xià cì yòng tóng yàng de zhòng liàng.",
    });
  }

  if (now.used.length > 0 && now.used.length < now.total) {
    return keep(locale, name, same(locale), {
      fr: `${now.used.length}/${now.total} séries notées. Note les séries manquantes avant de monter.`,
      en: `${now.used.length}/${now.total} sets logged. Log the missing sets before adding load.`,
      zh: `记了 ${now.used.length}/${now.total} 组。先把缺的组补上，再加重量。`,
      py: `jì le ${now.used.length}/${now.total} zǔ. xiān bǔ shàng, zài jiā zhòng liàng.`,
    });
  }

  if (isNeck(name)) {
    return keep(locale, name, {
      fr: "très léger",
      en: "very light",
      zh: "非常轻",
      py: "fēi cháng qīng",
    }, {
      fr: "Cou : charge très légère, 15–20 reps, sans douleur.",
      en: "Neck: keep it very light, 15–20 reps, no pain.",
      zh: "颈部：重量非常轻，15 到 20 次，不能疼。",
      py: "jǐng bù: zhòng liàng fēi cháng qīng, 15 dào 20 cì, bù néng téng.",
    });
  }

  const effort = effortOf(exercise.sets, kind);
  const feel = lastFeel(exercise.sets, kind);
  const hard = effort === "hard" || feel === "hard";
  const kg = now.avgKg;
  const minReps = now.minReps;
  const maxReps = now.maxReps;
  const prevKg = before?.avgKg ?? null;
  const prevMinReps = before?.minReps ?? null;
  const conservative = isConservative(name);

  if (hard && kg !== null && range && minReps !== null && minReps < range.min) {
    const next = bumpKg(kg, -1);
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

  if (hard && kind === "bodyweight" && range && minReps !== null && minReps < range.min) {
    return {
      exercise: label(locale, name),
      change: "drop_reps",
      amount: locale === "fr" ? "−1–2 reps" : locale === "en" ? "−1–2 reps" : "−1 到 2 次",
      reason: txt(locale, {
        fr: `Tampon dur et sous ${range.min} reps (min ${minReps}). Recule de 1–2 reps. Pas de charge inventée.`,
        en: `Stamped hard and under ${range.min} reps (low ${minReps}). Drop 1–2 reps. Do not invent a load.`,
        zh: `标记为吃力，次数低于 ${range.min}（最低 ${minReps}）。减 1 到 2 次。不要凭空加重量。`,
        py: `tài nán, cì shù piān dī. jiǎn 1 dào 2 cì.`,
      }),
    };
  }

  if (hard) {
    return keep(locale, name, same(locale), {
      fr: `Tampon dur${minReps !== null ? ` (${minReps} reps)` : ""}${kg !== null ? `, ${fmtKg(locale, kg)} kg` : ""}. Même charge. 1–3 reps en réserve.`,
      en: `Stamped hard${minReps !== null ? ` (${minReps} reps)` : ""}${kg !== null ? `, ${fmtKg(locale, kg)} kg` : ""}. Same load. Leave 1–3 reps in reserve.`,
      zh: `标记为吃力${minReps !== null ? `（${minReps} 次）` : ""}${kg !== null ? `，${fmtKg(locale, kg)} 公斤` : ""}。重量不变。留 1 到 3 次余力。`,
      py: `biāo jì wéi chī lì. zhòng liàng bú biàn.`,
    });
  }

  if (kind !== "bodyweight" && kg !== null && prevKg !== null && kg < prevKg - 0.4) {
    const next = bumpKg(kg, -1);
    return {
      exercise: label(locale, name),
      change: "drop_weight",
      amount: amountWeight(locale, kg, next),
      reason: txt(locale, {
        fr: `Charge en baisse (${fmtKg(locale, prevKg)} → ${fmtKg(locale, kg)} kg). On recule d’un cran, 1–3 reps en réserve.`,
        en: `Load dropped (${fmtKg(locale, prevKg)} → ${fmtKg(locale, kg)} kg). Step back one increment, leave 1–3 reps in reserve.`,
        zh: `重量下降（${fmtKg(locale, prevKg)} → ${fmtKg(locale, kg)} 公斤）。先减一档，每组留 1 到 3 次余力。`,
        py: `zhòng liàng xià jiàng. xiān jiǎn yì dǎng.`,
      }),
    };
  }

  if (range && minReps !== null && minReps >= range.max) {
    if (kind === "bodyweight") {
      const extra = kg !== null && kg > 0;
      if (extra) {
        const next = bumpKg(kg, 1);
        return {
          exercise: label(locale, name),
          change: "add_weight",
          amount: amountWeight(locale, kg, next),
          reason: txt(locale, {
            fr: `Lesté à ${fmtKg(locale, kg)} kg, ${minReps} reps propres, pas dur. Prochaine fois : ${fmtKg(locale, next)} kg.`,
            en: `Weighted at ${fmtKg(locale, kg)} kg, ${minReps} clean reps, not hard. Next time: ${fmtKg(locale, next)} kg.`,
            zh: `负重 ${fmtKg(locale, kg)} 公斤，干净做满 ${minReps} 次，而且不吃力。下次用 ${fmtKg(locale, next)} 公斤。`,
            py: `fù zhòng yǐ zuò mǎn. xià cì jiā zhòng liàng.`,
          }),
        };
      }
      return {
        exercise: label(locale, name),
        change: "add_reps",
        amount: locale === "fr" ? "+1–2 reps" : locale === "en" ? "+1–2 reps" : "+1 到 2 次",
        reason: txt(locale, {
          fr: `Toutes les séries à ${minReps} reps, haut de ${range.min}–${range.max}, pas dur. D’abord +reps. Lest seulement si 10+ reps propres.`,
          en: `Every set hit ${minReps} reps, top of ${range.min}–${range.max}, not hard. Add reps first. Add load only if 10+ clean reps.`,
          zh: `每组都做满 ${minReps} 次，已到 ${range.min} 到 ${range.max} 上限，而且不吃力。先加次数。干净做到 10 次以上再考虑负重。`,
          py: `měi zǔ dōu zuò mǎn. xiān jiā cì shù.`,
        }),
      };
    }
    if (kg !== null) {
      const next = bumpKg(kg, 1);
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
          py: `měi zǔ dōu zuò mǎn ${minReps} cì. xià cì yòng ${fmtKg(locale, next)} gōng jīn.`,
        }),
      };
    }
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

  if (kg !== null && prevKg !== null && minReps !== null && prevMinReps !== null && minReps + 1.5 < prevMinReps) {
    return keep(locale, name, same(locale), {
      fr: `Reps en baisse vs la séance précédente. Garde ${fmtKg(locale, kg)} kg, 1–3 reps en réserve.`,
      en: `Reps dropped vs last time. Keep ${fmtKg(locale, kg)} kg, leave 1–3 reps in reserve.`,
      zh: `次数比上次少。保持 ${fmtKg(locale, kg)} 公斤，每组留 1 到 3 次余力。`,
      py: `cì shù bǐ shàng cì shǎo. bǎo chí ${fmtKg(locale, kg)} gōng jīn.`,
    });
  }

  return keep(locale, name, same(locale), {
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
      ? "zhòng dòng zuò. zhòng liàng bú biàn."
      : "hái méi yǒu měi zǔ dōu zuò dào shàng xiàn.",
  });
}

function summarize(locale: Locale, name: string, adjustments: SessionAdjustment[]) {
  const addW = adjustments.filter((item) => item.change === "add_weight").length;
  const addR = adjustments.filter((item) => item.change === "add_reps").length;
  const addT = adjustments.filter((item) => item.change === "add_time").length;
  const drop = adjustments.filter((item) => item.change === "drop_weight" || item.change === "drop_time").length;
  return txt(locale, {
    fr:
      drop > 0
        ? `${name} : ${drop} mouvement(s) trop durs ou en baisse. Recule d’un cran. Ailleurs : ${addW} à monter, ${addR} en reps, ${addT} en temps.`
        : addW + addT > 0
          ? `${name} : ${addW} à monter en charge, ${addT} à allonger, ${addR} encore en reps. Lombaires : rester conservateur.`
          : `${name} enregistrée. Prochaine fois : +1–2 reps ou +5 s là où tu n’es pas au max. 1–3 reps en réserve.`,
    en:
      drop > 0
        ? `${name}: ${drop} lift(s) were too hard or went down. Step back one increment. Elsewhere: add load on ${addW}, reps on ${addR}, time on ${addT}.`
        : addW + addT > 0
          ? `${name}: add load on ${addW}, add time on ${addT}, add reps on ${addR}. Stay conservative on the lower back.`
          : `${name} logged. Next time: add 1–2 reps or +5 s where you are not at the top. Leave 1–3 reps in reserve.`,
    zh:
      drop > 0
        ? `${name}：有 ${drop} 个动作太吃力或下降。先减一档。另外 ${addW} 个可加重量，${addR} 个加次数，${addT} 个加时间。`
        : addW + addT > 0
          ? `${name}：${addW} 个下次加重量，${addT} 个加时间，${addR} 个先加次数。腰部保持保守。`
          : `${name} 已记录。下次：没到上限的动作加 1 到 2 次或加 5 秒。每组留 1 到 3 次余力。`,
    py:
      drop > 0
        ? `${name}: yǒu dòng zuò tài nán. xiān jiǎn yì dǎng.`
        : `${name} yǐ jì lù. àn tǐ gǎn tiáo zhěng.`,
  });
}

export function analyzeSession(
  session: SessionLog,
  previous: SessionLog | null,
  locale: Locale,
): SessionAnalysis {
  const template = templateById(session.focus);
  const prevByKey = new Map(
    (previous?.exercises ?? []).map((exercise) => [exercise.id || exercise.name, exercise.sets]),
  );
  const prevByName = new Map((previous?.exercises ?? []).map((exercise) => [exercise.name, exercise.sets]));
  const adjustments = session.exercises.map((exercise) => {
    const meta =
      template?.exercises.find((item) => item.id === exercise.id) ??
      template?.exercises.find((item) => item.name === exercise.name) ??
      liftByName(exercise.name);
    return {
      ...adjustExercise(
        locale,
        exercise,
        prevByKey.get(exercise.id) ?? prevByName.get(exercise.name),
        meta?.prescription,
      ),
      key: exercise.id || exercise.name,
    };
  });
  return {
    summary: summarize(locale, session.name, adjustments),
    source: "local",
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
  exercise: { id?: string; name: string },
  locale: Locale,
) {
  return (
    session?.analysis?.adjustments.find(
      (item) =>
        item.key === exercise.id ||
        item.key === exercise.name ||
        item.exercise === exercise.name ||
        item.exercise === label(locale, exercise.name),
    ) ?? null
  );
}

function fmtInputKg(kg: number) {
  const rounded = Math.round(kg * 2) / 2;
  return rounded % 1 === 0 ? String(rounded) : String(rounded);
}

export function applyChangeToLoad(
  change: AdjustmentChange,
  kg: string,
  reps: string,
  seconds: string,
  kind: LiftKind,
) {
  const k = num(kg);
  const r = num(reps);
  const s = num(seconds);
  if (kind === "timed") {
    if (change === "add_time" && s !== null) return { kg: "", reps: "", seconds: String(s + 5) };
    if (change === "drop_time" && s !== null) return { kg: "", reps: "", seconds: String(Math.max(5, s - 5)) };
    return { kg: "", reps: "", seconds };
  }
  if (change === "add_weight" && k !== null) {
    return { kg: fmtInputKg(bumpKg(k, 1)), reps, seconds };
  }
  if (change === "drop_weight" && k !== null) {
    return { kg: fmtInputKg(bumpKg(k, -1)), reps, seconds };
  }
  if (change === "add_reps" && r !== null) {
    return { kg, reps: String(r + 1), seconds };
  }
  if (change === "drop_reps" && r !== null) {
    return { kg, reps: String(Math.max(1, r - 1)), seconds };
  }
  return { kg, reps, seconds };
}

export function prepareForAnalysis(session: SessionLog): SessionLog {
  return {
    ...session,
    exercises: session.exercises.map((exercise) => ({
      ...exercise,
      sets: exercise.sets.map((set) => ({
        ...set,
        done: set.done || filledSet(set, exercise.kind),
      })),
    })),
  };
}

export function seedSetsFromPrevious(
  exercise: { id: string; name: string; kind: LiftKind; sets: number },
  previous: SessionLog | null,
  locale: Locale,
) {
  const last =
    previous?.exercises.find((item) => item.id === exercise.id) ??
    previous?.exercises.find((item) => item.name === exercise.name);
  const adj = adjustmentFor(previous, exercise, locale);
  return emptySets(exercise.sets).map((set, index) => {
    const src = last?.sets[index] ?? last?.sets.at(-1);
    const kg = src?.kg ?? "";
    const reps = src?.reps ?? "";
    const seconds = src?.seconds || (exercise.kind === "timed" ? src?.reps ?? "" : "");
    const next = adj
      ? applyChangeToLoad(adj.change, kg, reps, seconds, exercise.kind)
      : { kg, reps, seconds };
    return { ...set, ...next };
  });
}
