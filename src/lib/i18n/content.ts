import type { Line, Locale, Text } from "./index";
import { t } from "./index";
import { copy, msg, thisWeekGain } from "./copy";

export const FOODS: Record<string, Line> = {
  "b-eggs": { fr: "3 œufs", en: "3 eggs", zh: "3 个鸡蛋", py: "sān gè jī dàn" },
  "b-bread": {
    fr: "2 pains ou mantou",
    en: "2 breads or mantou",
    zh: "2 个馒头或面包",
    py: "liǎng gè mán tou huò miàn bāo",
  },
  "b-banana": { fr: "1 banane", en: "1 banana", zh: "1 根香蕉", py: "yì gēn xiāng jiāo" },
  "b-milk": {
    fr: "500 ml de lait ou lait de soja",
    en: "500 ml milk or soy milk",
    zh: "500 毫升牛奶或豆浆",
    py: "500 háo shēng niú nǎi huò dòu jiāng",
  },
  "b-pb": {
    fr: "1 cuillère de beurre de cacahuète",
    en: "1 spoon of peanut butter",
    zh: "1 勺花生酱",
    py: "yì sháo huā shēng jiàng",
  },
  "l-rice": {
    fr: "Riz, 1,5 à 2 bols",
    en: "Rice, 1.5 to 2 bowls",
    zh: "米饭 1.5 到 2 碗",
    py: "mǐ fàn 1.5 dào 2 wǎn",
  },
  "l-meat": {
    fr: "Poulet, bœuf ou porc 150–200 g",
    en: "Chicken, beef, or pork 150–200 g",
    zh: "鸡肉、牛肉或猪肉 150 到 200 克",
    py: "jī ròu, niú ròu huò zhū ròu 150 dào 200 kè",
  },
  "l-veg": { fr: "Légumes", en: "Vegetables", zh: "蔬菜", py: "shū cài" },
  "l-tofu": { fr: "Tofu", en: "Tofu", zh: "豆腐", py: "dòu fu" },
  "l-oil": {
    fr: "Un peu d’huile dans le plat",
    en: "A spoon of oil in the dish",
    zh: "菜里加一点油",
    py: "cài lǐ jiā yì diǎn yóu",
  },
  "s-yogurt": { fr: "Yaourt entier", en: "Whole yogurt", zh: "全脂酸奶", py: "quán zhī suān nǎi" },
  "s-nuts": {
    fr: "30–40 g de cacahuètes ou noix",
    en: "30–40 g peanuts or nuts",
    zh: "30 到 40 克花生或坚果",
    py: "30 dào 40 kè huā shēng huò jiān guǒ",
  },
  "s-fruit": { fr: "1 fruit", en: "1 fruit", zh: "1 个水果", py: "yí gè shuǐ guǒ" },
  "d-carb": {
    fr: "Nouilles ou riz",
    en: "Noodles or rice",
    zh: "面条或米饭",
    py: "miàn tiáo huò mǐ fàn",
  },
  "d-protein": {
    fr: "Poisson, crevettes, poulet ou tofu",
    en: "Fish, shrimp, chicken, or tofu",
    zh: "鱼、虾、鸡肉或豆腐",
    py: "yú, xiā, jī ròu huò dòu fu",
  },
  "d-eggs": {
    fr: "2 œufs si le repas est pauvre en protéines",
    en: "2 eggs if the meal is low in protein",
    zh: "如果这餐蛋白质少，再加 2 个鸡蛋",
    py: "rú guǒ zhè cān dàn bái zhì shǎo, zài jiā 2 gè jī dàn",
  },
  "d-veg": { fr: "Légumes", en: "Vegetables", zh: "蔬菜", py: "shū cài" },
  "n-milk": { fr: "500 ml de lait", en: "500 ml milk", zh: "500 毫升牛奶", py: "500 háo shēng niú nǎi" },
  "n-banana": { fr: "1 banane", en: "1 banana", zh: "1 根香蕉", py: "yì gēn xiāng jiāo" },
  "n-oats": { fr: "60–80 g d’avoine", en: "60–80 g oats", zh: "60 到 80 克燕麦", py: "60 dào 80 kè yàn mài" },
  "n-pb": {
    fr: "1 à 2 cuillères de beurre de cacahuète",
    en: "1 to 2 spoons of peanut butter",
    zh: "1 到 2 勺花生酱",
    py: "1 dào 2 sháo huā shēng jiàng",
  },
  "x-peanuts": { fr: "30 g de cacahuètes", en: "30 g peanuts", zh: "30 克花生", py: "30 kè huā shēng" },
  "x-milk": {
    fr: "Un verre de lait entier",
    en: "A glass of whole milk",
    zh: "一杯全脂牛奶",
    py: "yì bēi quán zhī niú nǎi",
  },
  "x-rice": {
    fr: "Une portion de riz en plus",
    en: "One extra serving of rice",
    zh: "再加一碗米饭",
    py: "zài jiā yì wǎn mǐ fàn",
  },
  "x-pb": {
    fr: "Une cuillère de beurre de cacahuète",
    en: "One spoon of peanut butter",
    zh: "一勺花生酱",
    py: "yì sháo huā shēng jiàng",
  },
};

export const FOOD_ZH: Record<string, string> = {
  "b-eggs": "鸡蛋",
  "b-bread": "馒头",
  "b-banana": "香蕉",
  "b-milk": "牛奶 / 豆浆",
  "b-pb": "花生酱",
  "l-rice": "米饭",
  "l-meat": "鸡肉 / 牛肉 / 猪肉",
  "l-veg": "蔬菜",
  "l-tofu": "豆腐",
  "l-oil": "菜籽油 / 芝麻油",
  "s-yogurt": "酸奶",
  "s-nuts": "花生 / 核桃",
  "s-fruit": "水果",
  "d-carb": "面条 / 米饭",
  "d-protein": "鱼 / 虾 / 鸡肉 / 豆腐",
  "d-eggs": "鸡蛋",
  "d-veg": "蔬菜",
  "n-milk": "牛奶",
  "n-banana": "香蕉",
  "n-oats": "燕麦",
  "n-pb": "花生酱",
  "x-peanuts": "花生",
  "x-milk": "全脂牛奶",
  "x-rice": "米饭",
  "x-pb": "花生酱",
};

const MEAL_TITLE = {
  breakfast: "mealBreakfast",
  lunch: "mealLunch",
  snack: "mealSnack",
  dinner: "mealDinner",
  night: "mealNight",
} as const;

const MEAL_HINT = {
  breakfast: "hintBreakfast",
  lunch: "hintLunch",
  snack: "hintSnack",
  dinner: "hintDinner",
  night: "hintNight",
} as const;

export function mealTitle(locale: Locale, id: keyof typeof MEAL_TITLE) {
  return msg(locale, MEAL_TITLE[id]);
}

export function mealHint(locale: Locale, id: keyof typeof MEAL_HINT) {
  return msg(locale, MEAL_HINT[id]);
}

export function foodLabel(locale: Locale, id: string): Text {
  const line = FOODS[id];
  if (!line) return id;
  return t(locale, line);
}

export const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
export type DayKey = (typeof DAYS)[number];

const DAY_KEYS = {
  mon: "dayMon",
  tue: "dayTue",
  wed: "dayWed",
  thu: "dayThu",
  fri: "dayFri",
  sat: "daySat",
  sun: "daySun",
} as const;

const NOTE_KEYS = {
  walk: "noteWalk",
  restSmoothie: "noteRestSmoothie",
  optional: "noteOptional",
  rest: "noteRest",
  restBack: "noteRestBack",
} as const;

export function dayName(locale: Locale, day: DayKey) {
  return msg(locale, DAY_KEYS[day]);
}

export function dayNote(locale: Locale, note: keyof typeof NOTE_KEYS) {
  return msg(locale, NOTE_KEYS[note]);
}

export const TEMPLATES_I18N: Record<string, { name: Line; focus: Line }> = {
  "upper-a": {
    name: copy.upperA,
    focus: {
      fr: "Poitrine, dos, épaules",
      en: "Chest, back, shoulders",
      zh: "胸、背、肩",
      py: "xiōng, bèi, jiān",
    },
  },
  "lower-a": {
    name: copy.lowerA,
    focus: {
      fr: "Force et base : squats, ischios, mollets",
      en: "Strength base: squats, hamstrings, calves",
      zh: "力量基础：深蹲、腘绳、小腿",
      py: "lì liàng jī chǔ: shēn dūn, guó shéng, xiǎo tuǐ",
    },
  },
  "upper-b": {
    name: copy.upperB,
    focus: {
      fr: "Dos et épaules",
      en: "Back and shoulders",
      zh: "背和肩",
      py: "bèi hé jiān",
    },
  },
  "lower-b": {
    name: copy.lowerB,
    focus: {
      fr: "Jambes, hanches, gainage",
      en: "Legs, hips, core",
      zh: "腿、髋、核心",
      py: "tuǐ, kuān, hé xīn",
    },
  },
};

export const EXERCISES: Record<string, { name: Line; notes: Line }> = {
  "Développé couché": {
    name: { fr: "Développé couché", en: "Bench press", zh: "杠铃卧推", py: "gàng líng wò tuī" },
    notes: {
      fr: "Barre ou haltères. Contrôle la descente.",
      en: "Bar or dumbbells. Control the way down.",
      zh: "杠铃或哑铃。下放要控制。",
      py: "gàng líng huò yǎ líng. xià fàng yào kòng zhì.",
    },
  },
  "Développé épaules": {
    name: { fr: "Développé épaules", en: "Overhead press", zh: "推举", py: "tuī jǔ" },
    notes: {
      fr: "Assis ou debout, pas de cambrure excessive.",
      en: "Seated or standing. Do not over-arch your back.",
      zh: "坐着或站着，腰不要过度后仰。",
      py: "zuò zhe huò zhàn zhe, yāo bú yào guò dù hòu yǎng.",
    },
  },
  "Développé incliné": {
    name: { fr: "Développé incliné", en: "Incline press", zh: "上斜卧推", py: "shàng xié wò tuī" },
    notes: {
      fr: "Si pas de banc incliné : dips aux barres parallèles.",
      en: "No incline bench: use parallel-bar dips.",
      zh: "没有上斜凳就做双杠臂屈伸。",
      py: "méi yǒu shàng xié dèng jiù zuò shuāng gàng bì qū shēn.",
    },
  },
  "Écarté haltères": {
    name: { fr: "Écarté haltères", en: "Dumbbell fly", zh: "哑铃飞鸟", py: "yǎ líng fēi niǎo" },
    notes: {
      fr: "Léger, pour sentir la poitrine.",
      en: "Keep it light. Feel the chest.",
      zh: "重量轻一点，感受胸部。",
      py: "zhòng liàng qīng yì diǎn, gǎn shòu xiōng bù.",
    },
  },
  "Extension triceps": {
    name: { fr: "Extension triceps", en: "Triceps extension", zh: "肱三头伸展", py: "gōng sān tóu shēn zhǎn" },
    notes: {
      fr: "Poulie, haltère ou dips banc.",
      en: "Cable, dumbbell, or bench dips.",
      zh: "绳索、哑铃或凳上臂屈伸。",
      py: "shéng suǒ, yǎ líng huò dèng shàng bì qū shēn.",
    },
  },
  Tractions: {
    name: { fr: "Tractions", en: "Pull-ups", zh: "引体向上", py: "yǐn tǐ xiàng shàng" },
    notes: {
      fr: "Si trop dur : tirage poitrine. Si trop facile : lest.",
      en: "Too hard: lat pulldown. Too easy: add weight.",
      zh: "太难做下拉。太简单就负重。",
      py: "tài nán zuò xià lā. tài jiǎn dān jiù fù zhòng.",
    },
  },
  "Rowing barre": {
    name: { fr: "Rowing barre", en: "Barbell row", zh: "杠铃划船", py: "gàng líng huá chuán" },
    notes: {
      fr: "Torse stable, coudes le long du corps.",
      en: "Torso still. Elbows close to the body.",
      zh: "上身稳定，手肘靠近身体。",
      py: "shàng shēn wěn dìng, shǒu zhǒu kào jìn shēn tǐ.",
    },
  },
  "Soulevé de terre": {
    name: { fr: "Soulevé de terre", en: "Deadlift", zh: "硬拉", py: "yìng lā" },
    notes: {
      fr: "Technique propre. Réduis la charge si le dos s’arrondit.",
      en: "Keep form clean. Lower the weight if your back rounds.",
      zh: "动作要标准。腰背弓了就减重量。",
      py: "dòng zuò yào biāo zhǔn. yāo bèi gōng le jiù jiǎn zhòng liàng.",
    },
  },
  "Face pull ou oiseau": {
    name: { fr: "Face pull ou oiseau", en: "Face pull or rear delt fly", zh: "面拉或反向飞鸟", py: "miàn lā huò fǎn xiàng fēi niǎo" },
    notes: {
      fr: "Épaules arrière, pour équilibrer le développé.",
      en: "Rear delts, to balance the pressing work.",
      zh: "练后肩，平衡推的训练。",
      py: "liàn hòu jiān, píng héng tuī de xùn liàn.",
    },
  },
  "Curl biceps": {
    name: { fr: "Curl biceps", en: "Biceps curl", zh: "弯举", py: "wān jǔ" },
    notes: {
      fr: "Barre, haltères ou prise marteau.",
      en: "Bar, dumbbells, or hammer grip.",
      zh: "杠铃、哑铃或锤式弯举。",
      py: "gàng líng, yǎ líng huò chuí shì wān jǔ.",
    },
  },
  Squat: {
    name: { fr: "Squat", en: "Squat", zh: "深蹲", py: "shēn dūn" },
    notes: {
      fr: "Si le squat barre est inconfortable : presse à cuisses.",
      en: "If the barbell squat feels bad: use the leg press.",
      zh: "杠铃深蹲不舒服就改腿举。",
      py: "gàng líng shēn dūn bù shū fu jiù gǎi tuǐ jǔ.",
    },
  },
  "Presse à cuisses": {
    name: { fr: "Presse à cuisses", en: "Leg press", zh: "腿举", py: "tuǐ jǔ" },
    notes: {
      fr: "Amplitude complète, genoux dans l’axe.",
      en: "Full range. Knees in line with toes.",
      zh: "幅度做满，膝盖对准脚尖。",
      py: "fú dù zuò mǎn, xī gài duì zhǔn jiǎo jiān.",
    },
  },
  "Hip thrust": {
    name: { fr: "Hip thrust", en: "Hip thrust", zh: "臀推", py: "tún tuī" },
    notes: {
      fr: "Pause 1 s en haut. Hanches solides, lombaires déjà fatiguées : charge contrôlée.",
      en: "Pause 1 s at the top. Strong hips. The lower back is already tired: keep the load controlled.",
      zh: "顶部停 1 秒。髋要发力。腰已经累了：重量控制住。",
      py: "dǐng bù tíng 1 miǎo. kuān yào fā lì. yāo yǐ jīng lèi le: zhòng liàng kòng zhì zhù.",
    },
  },
  "Fentes marchées": {
    name: { fr: "Fentes marchées", en: "Walking lunges", zh: "行走弓步", py: "xíng zǒu gōng bù" },
    notes: {
      fr: "Haltères aux côtés. Petit pas, buste droit.",
      en: "Dumbbells at your sides. Short steps, upright torso.",
      zh: "手里拿哑铃。步子小一点，上身直立。",
      py: "shǒu lǐ ná yǎ líng. bù zi xiǎo yì diǎn, shàng shēn zhí lì.",
    },
  },
  "Mollets debout": {
    name: { fr: "Mollets debout", en: "Standing calf raise", zh: "站姿提踵", py: "zhàn zī tí zhǒng" },
    notes: {
      fr: "Pause 1 s en bas et en haut.",
      en: "Pause 1 s at the bottom and the top.",
      zh: "最低和最高都停 1 秒。",
      py: "zuì dī hé zuì gāo dōu tíng 1 miǎo.",
    },
  },
  "Tractions ou tirage": {
    name: { fr: "Tractions ou tirage", en: "Pull-ups or pulldown", zh: "引体或下拉", py: "yǐn tǐ huò xià lā" },
    notes: {
      fr: "Prise un peu plus large que mercredi.",
      en: "A little wider grip than Wednesday.",
      zh: "握距比周三稍宽一点。",
      py: "wò jù bǐ zhōu sān shāo kuān yì diǎn.",
    },
  },
  "Rowing unilatéral": {
    name: { fr: "Rowing unilatéral", en: "One-arm row", zh: "单臂划船", py: "dān bì huá chuán" },
    notes: {
      fr: "Appui sur un banc, dos plat.",
      en: "Hand on a bench, back flat.",
      zh: "手撑凳子，背部保持平坦。",
      py: "shǒu chēng dèng zi, bèi bù bǎo chí píng tǎn.",
    },
  },
  Gainage: {
    name: { fr: "Gainage", en: "Plank", zh: "平板支撑", py: "píng bǎn zhī chēng" },
    notes: {
      fr: "Bassin serré, pas de fesses trop hautes.",
      en: "Ribs down. Do not pike your hips.",
      zh: "收紧骨盆，屁股不要抬太高。",
      py: "shōu jǐn gǔ pén, pì gu bú yào tái tài gāo.",
    },
  },
  "Bench press": {
    name: { fr: "Bench press", en: "Bench press", zh: "杠铃卧推", py: "gàng líng wò tuī" },
    notes: {
      fr: "1–3 reps en réserve. +2,5–5 % quand tu fais 8 propre sur toutes les séries.",
      en: "Leave 1–3 reps in reserve. Add 2.5–5% when you hit 8 clean reps on every set.",
      zh: "每组留 1 到 3 次余力。所有组都能干净做满 8 次，就加 2.5% 到 5%。",
      py: "měi zǔ liú 1 dào 3 cì yú lì. suǒ yǒu zǔ dōu néng gān jìng zuò mǎn 8 cì, jiù jiā 2.5% dào 5%.",
    },
  },
  "Tractions pronation ou tirage vertical": {
    name: {
      fr: "Tractions pronation ou tirage vertical",
      en: "Pronated pull-ups or lat pulldown",
      zh: "正手引体或高位下拉",
      py: "zhèng shǒu yǐn tǐ huò gāo wèi xià lā",
    },
    notes: {
      fr: "Si les tractions sont trop dures : tirage vertical. Poitrine haute, pas de balancier.",
      en: "If pull-ups are too hard: lat pulldown. Chest up, no swinging.",
      zh: "引体太难就做下拉。挺胸，不要晃。",
      py: "yǐn tǐ tài nán jiù zuò xià lā. tǐng xiōng, bú yào huàng.",
    },
  },
  "Rowing poitrine soutenue": {
    name: {
      fr: "Rowing poitrine soutenue",
      en: "Chest-supported row",
      zh: "胸撑划船",
      py: "xiōng chēng huá chuán",
    },
    notes: {
      fr: "Poitrine collée au banc. Tire vers le bas des côtes.",
      en: "Chest glued to the pad. Pull toward the lower ribs.",
      zh: "胸口贴住垫子。拉向肋骨下沿。",
      py: "xiōng kǒu tiē zhù diàn zi. lā xiàng lèi gǔ xià yán.",
    },
  },
  "Développé incliné haltères": {
    name: {
      fr: "Développé incliné haltères",
      en: "Incline dumbbell press",
      zh: "上斜哑铃卧推",
      py: "shàng xié yǎ líng wò tuī",
    },
    notes: {
      fr: "Banc à 30°. Contrôle la descente.",
      en: "Bench at 30°. Control the way down.",
      zh: "凳子约 30 度。下放要控制。",
      py: "dèng zi yuē 30 dù. xià fàng yào kòng zhì.",
    },
  },
  "Élévations latérales": {
    name: {
      fr: "Élévations latérales",
      en: "Lateral raises",
      zh: "侧平举",
      py: "cè píng jǔ",
    },
    notes: {
      fr: "Coudes légèrement pliés. Pas d’élan du buste.",
      en: "Soft elbows. Do not swing the torso.",
      zh: "手肘微屈。上身不要借力晃。",
      py: "shǒu zhǒu wēi qū. shàng shēn bú yào jiè lì huàng.",
    },
  },
  "Curl haltères": {
    name: { fr: "Curl haltères", en: "Dumbbell curl", zh: "哑铃弯举", py: "yǎ líng wān jǔ" },
    notes: {
      fr: "Coudes stables. Pas de balancier.",
      en: "Elbows still. No swinging.",
      zh: "手肘稳住。不要甩。",
      py: "shǒu zhǒu wěn zhù. bú yào shuǎi.",
    },
  },
  "Extension triceps poulie": {
    name: {
      fr: "Extension triceps poulie",
      en: "Cable triceps extension",
      zh: "绳索肱三头伸展",
      py: "shéng suǒ gōng sān tóu shēn zhǎn",
    },
    notes: {
      fr: "Coudes collés au corps. Extension complète.",
      en: "Elbows tucked. Full lockout.",
      zh: "手肘贴身。伸直做满。",
      py: "shǒu zhǒu tiē shēn. shēn zhí zuò mǎn.",
    },
  },
  "Back squat": {
    name: { fr: "Back squat", en: "Back squat", zh: "杠铃深蹲", py: "gàng líng shēn dūn" },
    notes: {
      fr: "1–3 reps en réserve. Barre basse ou haute, genoux dans l’axe. Base pour plus tard.",
      en: "Leave 1–3 reps in reserve. High or low bar, knees in line. This is your base.",
      zh: "每组留 1 到 3 次余力。高杠或低杠都可以，膝盖对准脚尖。这是基础力量。",
      py: "měi zǔ liú 1 dào 3 cì yú lì. gāo gàng huò dī gàng dōu kě yǐ, xī gài duì zhǔn jiǎo jiān. zhè shì jī chǔ lì liàng.",
    },
  },
  "Romanian deadlift": {
    name: {
      fr: "Romanian deadlift",
      en: "Romanian deadlift",
      zh: "罗马尼亚硬拉",
      py: "luó mǎ ní yà yìng lā",
    },
    notes: {
      fr: "Hanche en arrière, dos plat. Travaille déjà les lombaires : ne va pas à l’échec.",
      en: "Hips back, flat back. This already loads the lower back: do not go to failure.",
      zh: "髋往后坐，背保持平。腰已经在发力：不要做到力竭。",
      py: "kuān wǎng hòu zuò, bèi bǎo chí píng. yāo yǐ jīng zài fā lì: bú yào zuò dào lì jié.",
    },
  },
  "Hack squat": {
    name: { fr: "Hack squat", en: "Hack squat", zh: "哈克深蹲", py: "hā kè shēn dūn" },
    notes: {
      fr: "Amplitude complète. Si pas de hack : presse à cuisses.",
      en: "Full range. No hack squat: use the leg press.",
      zh: "幅度做满。没有哈克就改腿举。",
      py: "fú dù zuò mǎn. méi yǒu hā kè jiù gǎi tuǐ jǔ.",
    },
  },
  "Leg curl": {
    name: { fr: "Leg curl", en: "Leg curl", zh: "腿弯举", py: "tuǐ wān jǔ" },
    notes: {
      fr: "Contrôle la descente. Ischios pour une chaîne postérieure solide.",
      en: "Control the way down. Hamstrings for a strong posterior chain.",
      zh: "下放要控制。练腘绳，把后链打牢。",
      py: "xià fàng yào kòng zhì. liàn guó shéng, bǎ hòu liàn dǎ láo.",
    },
  },
  "Ab wheel ou relevés de jambes": {
    name: {
      fr: "Ab wheel ou relevés de jambes",
      en: "Ab wheel or hanging leg raises",
      zh: "腹轮或悬垂举腿",
      py: "fù lún huò xuán chuí jǔ tuǐ",
    },
    notes: {
      fr: "Anti-extension : bassin serré, pas de dos creux. Si trop dur : relevés de jambes.",
      en: "Anti-extension: ribs down, no arched back. Too hard: use hanging leg raises.",
      zh: "抗伸展：收紧骨盆，腰不要塌。太难就改悬垂举腿。",
      py: "kàng shēn zhǎn: shōu jǐn gǔ pén, yāo bú yào tā. tài nán jiù gǎi xuán chuí jǔ tuǐ.",
    },
  },
  "Neck flexion / extension": {
    name: {
      fr: "Neck flexion / extension",
      en: "Neck flexion / extension",
      zh: "颈部屈伸",
      py: "jǐng bù qū shēn",
    },
    notes: {
      fr: "Charge très légère. Lent, sans douleur, sans à-coups.",
      en: "Very light load. Slow, no pain, no jerking.",
      zh: "重量非常轻。慢做，不能疼，不能猛甩。",
      py: "zhòng liàng fēi cháng qīng. màn zuò, bù néng téng, bù néng měng shuǎi.",
    },
  },
  "Overhead press": {
    name: { fr: "Overhead press", en: "Overhead press", zh: "过头推举", py: "guò tóu tuī jǔ" },
    notes: {
      fr: "Fessiers serrés, pas de cambrure. 1–3 reps en réserve.",
      en: "Glutes tight, no over-arching. Leave 1–3 reps in reserve.",
      zh: "夹紧臀部，腰不要过度后仰。每组留 1 到 3 次余力。",
      py: "jiā jǐn tún bù, yāo bú yào guò dù hòu yǎng. měi zǔ liú 1 dào 3 cì yú lì.",
    },
  },
  "Tractions prise neutre": {
    name: {
      fr: "Tractions prise neutre",
      en: "Neutral-grip pull-ups",
      zh: "对握引体向上",
      py: "duì wò yǐn tǐ xiàng shàng",
    },
    notes: {
      fr: "Prise marteau. Si trop dur : tirage prise neutre.",
      en: "Hammer grip. Too hard: use a neutral-grip pulldown.",
      zh: "锤式握法。太难就做对握下拉。",
      py: "chuí shì wò fǎ. tài nán jiù zuò duì wò xià lā.",
    },
  },
  "Rowing barre ou machine": {
    name: {
      fr: "Rowing barre ou machine",
      en: "Barbell or machine row",
      zh: "杠铃或器械划船",
      py: "gàng líng huò qì xiè huá chuán",
    },
    notes: {
      fr: "Torse stable. Coudes le long du corps. Dos plat.",
      en: "Torso still. Elbows close. Flat back.",
      zh: "上身稳定。手肘靠近身体。背保持平。",
      py: "shàng shēn wěn dìng. shǒu zhǒu kào jìn shēn tǐ. bèi bǎo chí píng.",
    },
  },
  "Développé couché haltères": {
    name: {
      fr: "Développé couché haltères",
      en: "Dumbbell bench press",
      zh: "哑铃卧推",
      py: "yǎ líng wò tuī",
    },
    notes: {
      fr: "Plus léger que le bench du lundi. Haltères pour les épaules.",
      en: "Lighter than Monday’s bench. Dumbbells are friendlier on the shoulders.",
      zh: "比周一的杠铃卧推轻一点。哑铃对肩膀更友好。",
      py: "bǐ zhōu yī de gàng líng wò tuī qīng yì diǎn. yǎ líng duì jiān bǎng gèng yǒu hǎo.",
    },
  },
  "Cable fly": {
    name: { fr: "Cable fly", en: "Cable fly", zh: "绳索夹胸", py: "shéng suǒ jiā xiōng" },
    notes: {
      fr: "Arc contrôlé. Coudes légèrement pliés.",
      en: "Controlled arc. Soft elbows.",
      zh: "弧线要控制。手肘微屈。",
      py: "hú xiàn yào kòng zhì. shǒu zhǒu wēi qū.",
    },
  },
  "Reverse fly": {
    name: { fr: "Reverse fly", en: "Reverse fly", zh: "反向飞鸟", py: "fǎn xiàng fēi niǎo" },
    notes: {
      fr: "Épaules arrière. Équilibre le développé pour un dos solide.",
      en: "Rear delts. Balances pressing so the upper back stays strong.",
      zh: "练后肩。平衡推的训练，把上背打牢。",
      py: "liàn hòu jiān. píng héng tuī de xùn liàn, bǎ shàng bèi dǎ láo.",
    },
  },
  "Curl incliné": {
    name: { fr: "Curl incliné", en: "Incline curl", zh: "上斜弯举", py: "shàng xié wān jǔ" },
    notes: {
      fr: "Banc incliné. Bras en arrière, pas d’élan.",
      en: "Incline bench. Arms behind the torso, no swing.",
      zh: "上斜凳。手臂落在身后，不要甩。",
      py: "shàng xié dèng. shǒu bì luò zài shēn hòu, bú yào shuǎi.",
    },
  },
  "Triceps pushdown": {
    name: {
      fr: "Triceps pushdown",
      en: "Triceps pushdown",
      zh: "绳索下压",
      py: "shéng suǒ xià yā",
    },
    notes: {
      fr: "Coudes fixes. Corde ou barre.",
      en: "Elbows fixed. Rope or bar.",
      zh: "手肘固定。绳子或直杆都可以。",
      py: "shǒu zhǒu gù dìng. shéng zi huò zhí gān dōu kě yǐ.",
    },
  },
  "Deadlift classique ou trap-bar": {
    name: {
      fr: "Deadlift classique ou trap-bar",
      en: "Conventional or trap-bar deadlift",
      zh: "传统硬拉或六角杠硬拉",
      py: "chuán tǒng yìng lā huò liù jiǎo gàng yìng lā",
    },
    notes: {
      fr: "Technique propre. Trap-bar si le bas du dos fatigue. Jamais à l’échec.",
      en: "Clean technique. Use a trap bar if the lower back is tired. Never to failure.",
      zh: "动作要标准。腰累了就改六角杠。永远不要做到力竭。",
      py: "dòng zuò yào biāo zhǔn. yāo lèi le jiù gǎi liù jiǎo gàng. yǒng yuǎn bú yào zuò dào lì jié.",
    },
  },
  "Front squat ou hack squat": {
    name: {
      fr: "Front squat ou hack squat",
      en: "Front squat or hack squat",
      zh: "前蹲或哈克深蹲",
      py: "qián dūn huò hā kè shēn dūn",
    },
    notes: {
      fr: "Plus léger que le squat du mardi. Torse droit.",
      en: "Lighter than Tuesday’s squat. Torso upright.",
      zh: "比周二的深蹲轻一点。上身直立。",
      py: "bǐ zhōu èr de shēn dūn qīng yì diǎn. shàng shēn zhí lì.",
    },
  },
  "Bulgarian split squat": {
    name: {
      fr: "Bulgarian split squat",
      en: "Bulgarian split squat",
      zh: "保加利亚分腿蹲",
      py: "bǎo jiā lì yà fēn tuǐ dūn",
    },
    notes: {
      fr: "Genou avant dans l’axe. Base unilatérale pour un corps grand.",
      en: "Front knee in line. Unilateral work for a tall frame.",
      zh: "前膝对准脚尖。单腿训练，适合高个子把底盘打稳。",
      py: "qián xī duì zhǔn jiǎo jiān. dān tuǐ xùn liàn, shì hé gāo gè zi bǎ dǐ pán dǎ wěn.",
    },
  },
  "Mollets assis": {
    name: { fr: "Mollets assis", en: "Seated calf raise", zh: "坐姿提踵", py: "zuò zī tí zhǒng" },
    notes: {
      fr: "Soléaire. Pause en bas.",
      en: "Soleus. Pause at the bottom.",
      zh: "练比目鱼肌。最低点停一下。",
      py: "liàn bǐ mù yú jī. zuì dī diǎn tíng yí xià.",
    },
  },
  "Copenhagen plank": {
    name: {
      fr: "Copenhagen plank",
      en: "Copenhagen plank",
      zh: "哥本哈根支撑",
      py: "gē běn hā gēn zhī chēng",
    },
    notes: {
      fr: "Stabilité latérale. Genou ou cheville sur le banc selon le niveau.",
      en: "Lateral stability. Knee or ankle on the bench depending on level.",
      zh: "侧向稳定。按能力把膝盖或脚踝放在凳上。",
      py: "cè xiàng wěn dìng. àn néng lì bǎ xī gài huò jiǎo huái fàng zài dèng shàng.",
    },
  },
  "Side plank ou Pallof press": {
    name: {
      fr: "Side plank ou Pallof press",
      en: "Side plank or Pallof press",
      zh: "侧平板或帕洛夫推",
      py: "cè píng bǎn huò pà luò fū tuī",
    },
    notes: {
      fr: "Anti-rotation. Pallof si le side plank irrite l’épaule.",
      en: "Anti-rotation. Use Pallof if the side plank bothers the shoulder.",
      zh: "抗旋转。侧平板弄到肩膀就不舒服，就改帕洛夫推。",
      py: "kàng xuán zhuǎn. cè píng bǎn nòng dào jiān bǎng jiù bù shū fu, jiù gǎi pà luò fū tuī.",
    },
  },
};

export function exerciseName(locale: Locale, name: string): Text {
  const row = EXERCISES[name];
  if (!row) return name;
  return t(locale, row.name);
}

export function exerciseNotes(locale: Locale, name: string, fallback: string): Text {
  const row = EXERCISES[name];
  if (!row) return fallback;
  return t(locale, row.notes);
}

export function templateName(locale: Locale, id: string): Text {
  const row = TEMPLATES_I18N[id];
  if (!row) return id;
  return t(locale, row.name);
}

export function templateFocus(locale: Locale, id: string): Text {
  const row = TEMPLATES_I18N[id];
  if (!row) return id;
  return t(locale, row.focus);
}

export function plateauCopy(
  locale: Locale,
  kind: "warmup" | "up" | "plateau" | "flat",
  delta?: number,
) {
  if (kind === "warmup") {
    return { title: msg(locale, "plateauWarmTitle"), detail: msg(locale, "plateauWarmDetail") };
  }
  if (kind === "up") {
    return {
      title: thisWeekGain(locale, (delta ?? 0).toFixed(2)),
      detail: msg(locale, "plateauUpDetail"),
    };
  }
  if (kind === "plateau") {
    return { title: msg(locale, "plateauStuckTitle"), detail: msg(locale, "plateauStuckDetail") };
  }
  return { title: msg(locale, "plateauFlatTitle"), detail: msg(locale, "plateauFlatDetail") };
}
