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
  "l-veg": { fr: "Légumes, 1 portion", en: "Vegetables, 1 serving", zh: "蔬菜 1 份", py: "shū cài 1 fèn" },
  "l-tofu": { fr: "Tofu, 100–150 g", en: "Tofu, 100–150 g", zh: "豆腐 100 到 150 克", py: "dòu fu 100 dào 150 kè" },
  "l-oil": {
    fr: "1 cuillère d’huile (colza ou sésame)",
    en: "1 spoon of oil (rapeseed or sesame)",
    zh: "1 勺油（菜籽油或芝麻油）",
    py: "1 sháo yóu (cài zǐ yóu huò zhī ma yóu)",
  },
  "s-yogurt": {
    fr: "Yaourt entier, 150–200 g",
    en: "Whole yogurt, 150–200 g",
    zh: "全脂酸奶 150 到 200 克",
    py: "quán zhī suān nǎi 150 dào 200 kè",
  },
  "s-nuts": {
    fr: "30–40 g de cacahuètes ou noix",
    en: "30–40 g peanuts or nuts",
    zh: "30 到 40 克花生或坚果",
    py: "30 dào 40 kè huā shēng huò jiān guǒ",
  },
  "s-fruit": { fr: "1 fruit", en: "1 fruit", zh: "1 个水果", py: "yí gè shuǐ guǒ" },
  "d-carb": {
    fr: "Nouilles ou riz, 1,5 à 2 bols",
    en: "Noodles or rice, 1.5 to 2 bowls",
    zh: "面条或米饭 1.5 到 2 碗",
    py: "miàn tiáo huò mǐ fàn 1.5 dào 2 wǎn",
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
  "d-veg": { fr: "Légumes, 1 portion", en: "Vegetables, 1 serving", zh: "蔬菜 1 份", py: "shū cài 1 fèn" },
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
    fr: "250 ml de lait entier",
    en: "250 ml whole milk",
    zh: "250 毫升全脂牛奶",
    py: "250 háo shēng quán zhī niú nǎi",
  },
  "x-rice": {
    fr: "1 bol de riz en plus",
    en: "1 extra bowl of rice",
    zh: "再加一碗米饭",
    py: "zài jiā yì wǎn mǐ fàn",
  },
  "x-pb": {
    fr: "1 cuillère de beurre de cacahuète",
    en: "1 spoon of peanut butter",
    zh: "1 勺花生酱",
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

export const WARMUPS: Record<string, { name: Line; dose: Line; cue: Line }> = {
  "ua-pulse": {
    name: { fr: "Cardio facile", en: "Easy cardio", zh: "轻松有氧", py: "qīng sōng yǒu yǎng" },
    dose: { fr: "4 min", en: "4 min", zh: "4 分钟", py: "4 fēn zhōng" },
    cue: {
      fr: "Vélo, rameur ou marche. Respiration nasale, pas d’essoufflement.",
      en: "Bike, rower, or walk. Nasal breathing. Do not get out of breath.",
      zh: "单车、划船机或走路。用鼻子呼吸，不要喘。",
      py: "dān chē, huá chuán jī huò zǒu lù. yòng bí zi hū xī, bú yào chuǎn.",
    },
  },
  "ua-shoulders": {
    name: { fr: "Épaules", en: "Shoulders", zh: "肩膀", py: "jiān bǎng" },
    dose: { fr: "2 × 15", en: "2 × 15", zh: "2 × 15", py: "2 × 15" },
    cue: {
      fr: "Cercles d’épaules, puis pull-aparts élastique. Léger, amplitude complète.",
      en: "Arm circles, then band pull-aparts. Light, full range.",
      zh: "先绕肩，再做弹力带面拉。要轻，幅度做满。",
      py: "xiān rào jiān, zài zuò tán lì dài miàn lā. yào qīng, fú dù zuò mǎn.",
    },
  },
  "ua-scap": {
    name: { fr: "Omoplates", en: "Scapula", zh: "肩胛", py: "jiān jiǎ" },
    dose: { fr: "2 × 8", en: "2 × 8", zh: "2 × 8", py: "2 × 8" },
    cue: {
      fr: "Scap pull-ups ou dead hang 20 s. Épaules basses, poitrine haute.",
      en: "Scap pull-ups or a 20 s dead hang. Shoulders down, chest up.",
      zh: "肩胛引体，或悬垂 20 秒。沉肩、挺胸。",
      py: "jiān jiǎ yǐn tǐ, huò xuán chuí 20 miǎo. chén jiān, tǐng xiōng.",
    },
  },
  "ua-cuff": {
    name: { fr: "Coiffe des rotateurs", en: "Rotator cuff", zh: "肩袖", py: "jiān xiù" },
    dose: { fr: "2 × 15", en: "2 × 15", zh: "2 × 15", py: "2 × 15" },
    cue: {
      fr: "Face pulls légers. Coudes hauts. Réveille l’arrière d’épaule avant le bench.",
      en: "Light face pulls. Elbows high. Wake the rear delts before bench.",
      zh: "轻做面拉。手肘抬高。卧推前把后肩唤醒。",
      py: "qīng zuò miàn lā. shǒu zhǒu tái gāo. wò tuī qián bǎ hòu jiān huàn xǐng.",
    },
  },
  "ua-ramp": {
    name: { fr: "Montée bench", en: "Bench ramp", zh: "卧推热身组", py: "wò tuī rè shēn zǔ" },
    dose: { fr: "3 séries", en: "3 sets", zh: "3 组", py: "3 zǔ" },
    cue: {
      fr: "Barre × 8, ~50 % × 5, ~70 % × 3. Jamais à l’échec. Puis la première série de travail.",
      en: "Empty bar × 8, ~50% × 5, ~70% × 3. Never to failure. Then the first work set.",
      zh: "空杆 8 次，约 50% 做 5 次，约 70% 做 3 次。不要力竭。然后开始正式组。",
      py: "kōng gān 8 cì, yuē 50% zuò 5 cì, yuē 70% zuò 3 cì. bú yào lì jié.",
    },
  },
  "la-pulse": {
    name: { fr: "Cardio facile", en: "Easy cardio", zh: "轻松有氧", py: "qīng sōng yǒu yǎng" },
    dose: { fr: "4 min", en: "4 min", zh: "4 分钟", py: "4 fēn zhōng" },
    cue: {
      fr: "Marche ou vélo. Hanches et genoux se mettent en route, sans fatigue.",
      en: "Walk or bike. Get the hips and knees moving, without fatigue.",
      zh: "走路或骑车。把髋和膝盖活动开，不要累。",
      py: "zǒu lù huò qí chē. bǎ kuān hé xī gài huó dòng kāi, bú yào lèi.",
    },
  },
  "la-hips": {
    name: { fr: "Hanches et dos", en: "Hips and back", zh: "髋和背", py: "kuān hé bèi" },
    dose: { fr: "1–2 min", en: "1–2 min", zh: "1 到 2 分钟", py: "1 dào 2 fēn zhōng" },
    cue: {
      fr: "90/90 hanches, puis chat-chameau. Bassin mobile, dos sans douleur.",
      en: "90/90 hip switches, then cat-camel. Hips moving, no pain in the back.",
      zh: "90/90 转髋，再做猫牛。髋要活动，腰不能疼。",
      py: "90/90 zhuǎn kuān, zài zuò māo niú. kuān yào huó dòng, yāo bù néng téng.",
    },
  },
  "la-glutes": {
    name: { fr: "Fessiers", en: "Glutes", zh: "臀部", py: "tún bù" },
    dose: { fr: "2 × 10", en: "2 × 10", zh: "2 × 10", py: "2 × 10" },
    cue: {
      fr: "Pont fessier au sol. Pause 1 s en haut. Réveille les hanches avant le squat.",
      en: "Glute bridge on the floor. Pause 1 s at the top. Wake the hips before squatting.",
      zh: "仰卧臀桥。顶部停 1 秒。深蹲前把髋唤醒。",
      py: "yǎng wò tún qiáo. dǐng bù tíng 1 miǎo. shēn dūn qián bǎ kuān huàn xǐng.",
    },
  },
  "la-pattern": {
    name: { fr: "Squat au poids du corps", en: "Bodyweight squat", zh: "徒手深蹲", py: "tú shǒu shēn dūn" },
    dose: { fr: "2 × 8", en: "2 × 8", zh: "2 × 8", py: "2 × 8" },
    cue: {
      fr: "Lent, genoux dans l’axe, profondeur confortable. Pas de charge.",
      en: "Slow, knees in line, comfortable depth. No load.",
      zh: "慢做，膝盖对准脚尖，深度舒服即可。不要负重。",
      py: "màn zuò, xī gài duì zhǔn jiǎo jiān, shēn dù shū fu. bú yào fù zhòng.",
    },
  },
  "la-ramp": {
    name: { fr: "Montée squat", en: "Squat ramp", zh: "深蹲热身组", py: "shēn dūn rè shēn zǔ" },
    dose: { fr: "3 séries", en: "3 sets", zh: "3 组", py: "3 zǔ" },
    cue: {
      fr: "Barre × 8, ~50 % × 5, ~70 % × 3. 1–3 reps en réserve. Puis la première série de travail.",
      en: "Empty bar × 8, ~50% × 5, ~70% × 3. Leave 1–3 reps in reserve. Then the first work set.",
      zh: "空杆 8 次，约 50% 做 5 次，约 70% 做 3 次。留 1 到 3 次余力。然后开始正式组。",
      py: "kōng gān 8 cì, yuē 50% zuò 5 cì, yuē 70% zuò 3 cì. liú 1 dào 3 cì yú lì.",
    },
  },
  "ub-pulse": {
    name: { fr: "Cardio facile", en: "Easy cardio", zh: "轻松有氧", py: "qīng sōng yǒu yǎng" },
    dose: { fr: "4 min", en: "4 min", zh: "4 分钟", py: "4 fēn zhōng" },
    cue: {
      fr: "Vélo ou rameur. Épaules relâchées, pas de charge encore.",
      en: "Bike or rower. Shoulders relaxed. No lifting yet.",
      zh: "单车或划船机。肩膀放松，先不要加重量。",
      py: "dān chē huò huá chuán jī. jiān bǎng fàng sōng, xiān bú yào jiā zhòng liàng.",
    },
  },
  "ub-slides": {
    name: { fr: "Wall slides", en: "Wall slides", zh: "靠墙滑臂", py: "kào qiáng huá bì" },
    dose: { fr: "2 × 8", en: "2 × 8", zh: "2 × 8", py: "2 × 8" },
    cue: {
      fr: "Dos au mur, avant-bras qui glissent vers le haut. Ouvre les épaules pour le développé militaire.",
      en: "Back to the wall, forearms slide up. Open the shoulders for overhead press.",
      zh: "背靠墙，小臂向上滑。为过头推举把肩膀打开。",
      py: "bèi kào qiáng, xiǎo bì xiàng shàng huá. wèi guò tóu tuī jǔ bǎ jiān bǎng dǎ kāi.",
    },
  },
  "ub-cuff": {
    name: { fr: "Rotation externe", en: "External rotation", zh: "肩外旋", py: "jiān wài xuán" },
    dose: { fr: "2 × 12 / côté", en: "2 × 12 / side", zh: "每侧 2 × 12", py: "měi cè 2 × 12" },
    cue: {
      fr: "Élastique, coude collé au corps. Léger. Prépare la coiffe avant de pousser au-dessus de la tête.",
      en: "Band, elbow tucked. Light. Prep the cuff before pressing overhead.",
      zh: "弹力带，手肘贴身。要轻。过头推之前把肩袖准备好。",
      py: "tán lì dài, shǒu zhǒu tiē shēn. yào qīng. guò tóu tuī zhī qián bǎ jiān xiù zhǔn bèi hǎo.",
    },
  },
  "ub-rear": {
    name: { fr: "Y raises", en: "Y raises", zh: "Y 字平举", py: "Y zì píng jǔ" },
    dose: { fr: "2 × 10", en: "2 × 10", zh: "2 × 10", py: "2 × 10" },
    cue: {
      fr: "Haltères très légers, bras en Y. Contrôle. Équilibre le développé.",
      en: "Very light dumbbells, arms in a Y. Controlled. Balances the press.",
      zh: "很轻的哑铃，手臂成 Y。控制着做。平衡推的动作。",
      py: "hěn qīng de yǎ líng, shǒu bì chéng Y. kòng zhì zhe zuò.",
    },
  },
  "ub-ramp": {
    name: { fr: "Montée développé militaire", en: "OHP ramp", zh: "推举热身组", py: "tuī jǔ rè shēn zǔ" },
    dose: { fr: "3 séries", en: "3 sets", zh: "3 组", py: "3 zǔ" },
    cue: {
      fr: "Barre × 8, ~50 % × 5, ~70 % × 3. Fessiers serrés, pas de cambrure. Puis la première série de travail.",
      en: "Empty bar × 8, ~50% × 5, ~70% × 3. Glutes tight, no over-arching. Then the first work set.",
      zh: "空杆 8 次，约 50% 做 5 次，约 70% 做 3 次。夹紧臀部，腰不要后仰。然后开始正式组。",
      py: "kōng gān 8 cì, yuē 50% zuò 5 cì, yuē 70% zuò 3 cì. jiā jǐn tún bù, yāo bú yào hòu yǎng.",
    },
  },
  "lb-pulse": {
    name: { fr: "Cardio facile", en: "Easy cardio", zh: "轻松有氧", py: "qīng sōng yǒu yǎng" },
    dose: { fr: "4 min", en: "4 min", zh: "4 分钟", py: "4 fēn zhōng" },
    cue: {
      fr: "Marche. Réchauffe hanches, ischios et bas du dos avant le deadlift.",
      en: "Walk. Warm the hips, hamstrings, and lower back before deadlifting.",
      zh: "走路。硬拉前把髋、腘绳和腰活动开。",
      py: "zǒu lù. yìng lā qián bǎ kuān, guó shéng hé yāo huó dòng kāi.",
    },
  },
  "lb-hinge": {
    name: { fr: "Charnière de hanche", en: "Hip hinge", zh: "髋铰链", py: "kuān jiǎo liàn" },
    dose: { fr: "2 × 8", en: "2 × 8", zh: "2 × 8", py: "2 × 8" },
    cue: {
      fr: "Bâton ou barre vide contre le dos. Hanche en arrière, dos plat. Le schéma du deadlift, sans charge.",
      en: "Stick or empty bar along the back. Hips back, flat back. The deadlift pattern, unloaded.",
      zh: "棍子或空杆贴背。髋往后坐，背保持平。这是硬拉的模式，不要负重。",
      py: "gùn zi huò kōng gān tiē bèi. kuān wǎng hòu zuò, bèi bǎo chí píng.",
    },
  },
  "lb-glutes": {
    name: { fr: "Fessiers", en: "Glutes", zh: "臀部", py: "tún bù" },
    dose: { fr: "2 × 10", en: "2 × 10", zh: "2 × 10", py: "2 × 10" },
    cue: {
      fr: "Pont fessier. Pause 1 s en haut. Les hanches poussent, pas le bas du dos.",
      en: "Glute bridge. Pause 1 s at the top. Hips drive, not the lower back.",
      zh: "臀桥。顶部停 1 秒。用髋发力，不要用腰。",
      py: "tún qiáo. dǐng bù tíng 1 miǎo. yòng kuān fā lì, bú yào yòng yāo.",
    },
  },
  "lb-adductor": {
    name: { fr: "Adducteurs", en: "Adductors", zh: "内收肌", py: "nèi shōu jī" },
    dose: { fr: "1 × 20 s / côté", en: "1 × 20 s / side", zh: "每侧 1 × 20 秒", py: "měi cè 1 × 20 miǎo" },
    cue: {
      fr: "Copenhagen court (genou sur le banc) ou squeeze ballon. Léger. Réveille l’intérieur de cuisse.",
      en: "Short Copenhagen (knee on the bench) or a ball squeeze. Light. Wake the inner thigh.",
      zh: "短哥本哈根（膝盖撑凳）或夹球。要轻。把大腿内侧唤醒。",
      py: "duǎn gē běn hā gēn (xī gài chēng dèng) huò jiā qiú. yào qīng.",
    },
  },
  "lb-ramp": {
    name: { fr: "Montée deadlift", en: "Deadlift ramp", zh: "硬拉热身组", py: "yìng lā rè shēn zǔ" },
    dose: { fr: "2 séries", en: "2 sets", zh: "2 组", py: "2 zǔ" },
    cue: {
      fr: "~40 % × 5, ~60 % × 3. Technique propre. Jamais à l’échec. Puis la première série de travail.",
      en: "~40% × 5, ~60% × 3. Clean technique. Never to failure. Then the first work set.",
      zh: "约 40% 做 5 次，约 60% 做 3 次。动作要标准。不要力竭。然后开始正式组。",
      py: "yuē 40% zuò 5 cì, yuē 60% zuò 3 cì. dòng zuò yào biāo zhǔn. bú yào lì jié.",
    },
  },
};

export function warmupCopy(locale: Locale, id: string) {
  const row = WARMUPS[id];
  if (!row) return { name: id, dose: "", cue: "" };
  return {
    name: t(locale, row.name),
    dose: t(locale, row.dose),
    cue: t(locale, row.cue),
  };
}

export const TEMPLATES_I18N: Record<string, { name: Line; focus: Line }> = {
  "upper-a": {
    name: copy.upperA,
    focus: {
      fr: "Poussée et tirage : développé, tractions, épaules",
      en: "Press and pull: bench, pull-ups, shoulders",
      zh: "推和拉：卧推、引体、肩",
      py: "tuī hé lā: wò tuī, yǐn tǐ, jiān",
    },
  },
  "lower-a": {
    name: copy.lowerA,
    focus: {
      fr: "Force des jambes : squat, ischios, mollets",
      en: "Leg strength: squat, hamstrings, calves",
      zh: "腿部力量：深蹲、腘绳、小腿",
      py: "tuǐ bù lì liàng: shēn dūn, guó shéng, xiǎo tuǐ",
    },
  },
  "upper-b": {
    name: copy.upperB,
    focus: {
      fr: "Épaules, dos, développé haltères",
      en: "Shoulders, back, dumbbell press",
      zh: "肩、背、哑铃卧推",
      py: "jiān, bèi, yǎ líng wò tuī",
    },
  },
  "lower-b": {
    name: copy.lowerB,
    focus: {
      fr: "Deadlift, jambes unilatérales, gainage",
      en: "Deadlift, single-leg work, core",
      zh: "硬拉、单腿、核心",
      py: "yìng lā, dān tuǐ, hé xīn",
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
      fr: "Pause 1 s en haut. Charge contrôlée : les lombaires sont déjà fatigués.",
      en: "Pause 1 s at the top. Keep the load controlled: the lower back is already tired.",
      zh: "顶部停 1 秒。重量控制住：腰已经累了。",
      py: "dǐng bù tíng 1 miǎo. zhòng liàng kòng zhì zhù: yāo yǐ jīng lèi le.",
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
      fr: "Pause 1 s en bas et en haut. Amplitude complète.",
      en: "Pause 1 s at the bottom and the top. Full range.",
      zh: "最低和最高都停 1 秒。幅度做满。",
      py: "zuì dī hé zuì gāo dōu tíng 1 miǎo. fú dù zuò mǎn.",
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
      fr: "1–3 reps en réserve. Contrôle la descente. Quand les 4 séries atteignent 8 reps propres : +2,5–5 %.",
      en: "Leave 1–3 reps in reserve. Control the way down. When all 4 sets hit 8 clean reps: add 2.5–5%.",
      zh: "每组留 1 到 3 次余力。下放要控制。4 组都能干净做满 8 次，就加 2.5% 到 5%。",
      py: "měi zǔ liú 1 dào 3 cì yú lì. xià fàng yào kòng zhì. 4 zǔ dōu néng gān jìng zuò mǎn 8 cì, jiù jiā 2.5% dào 5%.",
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
      fr: "Poitrine haute, pas de balancier. Si les tractions n’atteignent pas 6 reps : tirage vertical.",
      en: "Chest up, no swinging. If pull-ups do not reach 6 reps: use lat pulldown.",
      zh: "挺胸，不要晃。引体做不满 6 次就改下拉。",
      py: "tǐng xiōng, bú yào huàng. yǐn tǐ zuò bù mǎn 6 cì jiù gǎi xià lā.",
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
      fr: "Poitrine collée au banc. Tire vers le bas des côtes. 1–3 reps en réserve.",
      en: "Chest glued to the pad. Pull toward the lower ribs. Leave 1–3 reps in reserve.",
      zh: "胸口贴住垫子。拉向肋骨下沿。每组留 1 到 3 次余力。",
      py: "xiōng kǒu tiē zhù diàn zi. lā xiàng lèi gǔ xià yán. měi zǔ liú 1 dào 3 cì yú lì.",
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
      fr: "Banc à 30°. Contrôle la descente. 1–3 reps en réserve.",
      en: "Bench at 30°. Control the way down. Leave 1–3 reps in reserve.",
      zh: "凳子约 30 度。下放要控制。每组留 1 到 3 次余力。",
      py: "dèng zi yuē 30 dù. xià fàng yào kòng zhì. měi zǔ liú 1 dào 3 cì yú lì.",
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
      fr: "Coudes légèrement pliés. Pas d’élan du buste. Stoppe 1–2 reps avant l’échec.",
      en: "Soft elbows. Do not swing the torso. Stop 1–2 reps before failure.",
      zh: "手肘微屈。上身不要借力晃。力竭前留 1 到 2 次。",
      py: "shǒu zhǒu wēi qū. shàng shēn bú yào jiè lì huàng. lì jié qián liú 1 dào 2 cì.",
    },
  },
  "Curl haltères": {
    name: { fr: "Curl haltères", en: "Dumbbell curl", zh: "哑铃弯举", py: "yǎ líng wān jǔ" },
    notes: {
      fr: "Coudes stables, pas de balancier. Stoppe 1–2 reps avant l’échec.",
      en: "Elbows still, no swinging. Stop 1–2 reps before failure.",
      zh: "手肘稳住，不要甩。力竭前留 1 到 2 次。",
      py: "shǒu zhǒu wěn zhù, bú yào shuǎi. lì jié qián liú 1 dào 2 cì.",
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
      fr: "Coudes collés au corps. Extension complète. Stoppe 1–2 reps avant l’échec.",
      en: "Elbows tucked. Full lockout. Stop 1–2 reps before failure.",
      zh: "手肘贴身。伸直做满。力竭前留 1 到 2 次。",
      py: "shǒu zhǒu tiē shēn. shēn zhí zuò mǎn. lì jié qián liú 1 dào 2 cì.",
    },
  },
  "Back squat": {
    name: { fr: "Back squat", en: "Back squat", zh: "杠铃深蹲", py: "gàng líng shēn dūn" },
    notes: {
      fr: "1–3 reps en réserve. Barre haute ou basse, genoux dans l’axe. Si le squat barre est inconfortable : presse à cuisses.",
      en: "Leave 1–3 reps in reserve. High or low bar, knees in line. If the barbell squat feels bad: use the leg press.",
      zh: "每组留 1 到 3 次余力。高杠或低杠都可以，膝盖对准脚尖。杠铃深蹲不舒服就改腿举。",
      py: "měi zǔ liú 1 dào 3 cì yú lì. gāo gàng huò dī gàng dōu kě yǐ, xī gài duì zhǔn jiǎo jiān. gàng líng shēn dūn bù shū fu jiù gǎi tuǐ jǔ.",
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
      fr: "Hanche en arrière, dos plat. Charge déjà les lombaires : 2–3 reps en réserve, jamais à l’échec.",
      en: "Hips back, flat back. This already loads the lower back: leave 2–3 reps in reserve, never to failure.",
      zh: "髋往后坐，背保持平。腰已经在发力：每组留 2 到 3 次余力，不要做到力竭。",
      py: "kuān wǎng hòu zuò, bèi bǎo chí píng. yāo yǐ jīng zài fā lì: měi zǔ liú 2 dào 3 cì yú lì, bú yào zuò dào lì jié.",
    },
  },
  "Hack squat": {
    name: { fr: "Hack squat", en: "Hack squat", zh: "哈克深蹲", py: "hā kè shēn dūn" },
    notes: {
      fr: "Amplitude complète, genoux dans l’axe. Si pas de hack squat : presse à cuisses.",
      en: "Full range, knees in line. No hack squat: use the leg press.",
      zh: "幅度做满，膝盖对准脚尖。没有哈克就改腿举。",
      py: "fú dù zuò mǎn, xī gài duì zhǔn jiǎo jiān. méi yǒu hā kè jiù gǎi tuǐ jǔ.",
    },
  },
  "Leg curl": {
    name: { fr: "Leg curl", en: "Leg curl", zh: "腿弯举", py: "tuǐ wān jǔ" },
    notes: {
      fr: "Contrôle la descente, 2 s. Stoppe 1–2 reps avant l’échec.",
      en: "Control the way down for 2 s. Stop 1–2 reps before failure.",
      zh: "下放控制 2 秒。力竭前留 1 到 2 次。",
      py: "xià fàng kòng zhì 2 miǎo. lì jié qián liú 1 dào 2 cì.",
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
      fr: "Charge très légère. Lent, 15–20 reps, sans douleur, sans à-coups.",
      en: "Very light load. Slow, 15–20 reps, no pain, no jerking.",
      zh: "重量非常轻。慢做 15 到 20 次，不能疼，不能猛甩。",
      py: "zhòng liàng fēi cháng qīng. màn zuò 15 dào 20 cì, bù néng téng, bù néng měng shuǎi.",
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
      fr: "Prise marteau. Si tu n’atteins pas 6 reps : tirage prise neutre.",
      en: "Hammer grip. If you do not reach 6 reps: use a neutral-grip pulldown.",
      zh: "锤式握法。做不满 6 次就改对握下拉。",
      py: "chuí shì wò fǎ. zuò bù mǎn 6 cì jiù gǎi duì wò xià lā.",
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
      fr: "Torse stable, coudes près du corps, dos plat. 1–3 reps en réserve.",
      en: "Torso still, elbows close, flat back. Leave 1–3 reps in reserve.",
      zh: "上身稳定，手肘靠近身体，背保持平。每组留 1 到 3 次余力。",
      py: "shàng shēn wěn dìng, shǒu zhǒu kào jìn shēn tǐ, bèi bǎo chí píng. měi zǔ liú 1 dào 3 cì yú lì.",
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
      fr: "Plus léger que le bench du lundi. Contrôle la descente. 1–3 reps en réserve.",
      en: "Lighter than Monday’s bench. Control the way down. Leave 1–3 reps in reserve.",
      zh: "比周一的杠铃卧推轻一点。下放要控制。每组留 1 到 3 次余力。",
      py: "bǐ zhōu yī de gàng líng wò tuī qīng yì diǎn. xià fàng yào kòng zhì. měi zǔ liú 1 dào 3 cì yú lì.",
    },
  },
  "Cable fly": {
    name: { fr: "Cable fly", en: "Cable fly", zh: "绳索夹胸", py: "shéng suǒ jiā xiōng" },
    notes: {
      fr: "Arc contrôlé, coudes légèrement pliés. Stoppe 1–2 reps avant l’échec.",
      en: "Controlled arc, soft elbows. Stop 1–2 reps before failure.",
      zh: "弧线要控制，手肘微屈。力竭前留 1 到 2 次。",
      py: "hú xiàn yào kòng zhì, shǒu zhǒu wēi qū. lì jié qián liú 1 dào 2 cì.",
    },
  },
  "Reverse fly": {
    name: { fr: "Reverse fly", en: "Reverse fly", zh: "反向飞鸟", py: "fǎn xiàng fēi niǎo" },
    notes: {
      fr: "Épaules arrière, pour équilibrer le développé. Stoppe 1–2 reps avant l’échec.",
      en: "Rear delts, to balance the pressing work. Stop 1–2 reps before failure.",
      zh: "练后肩，平衡推的训练。力竭前留 1 到 2 次。",
      py: "liàn hòu jiān, píng héng tuī de xùn liàn. lì jié qián liú 1 dào 2 cì.",
    },
  },
  "Curl incliné": {
    name: { fr: "Curl incliné", en: "Incline curl", zh: "上斜弯举", py: "shàng xié wān jǔ" },
    notes: {
      fr: "Banc incliné, bras en arrière, pas d’élan. Stoppe 1–2 reps avant l’échec.",
      en: "Incline bench, arms behind the torso, no swing. Stop 1–2 reps before failure.",
      zh: "上斜凳，手臂落在身后，不要甩。力竭前留 1 到 2 次。",
      py: "shàng xié dèng, shǒu bì luò zài shēn hòu, bú yào shuǎi. lì jié qián liú 1 dào 2 cì.",
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
      fr: "Coudes fixes. Corde ou barre. Stoppe 1–2 reps avant l’échec.",
      en: "Elbows fixed. Rope or bar. Stop 1–2 reps before failure.",
      zh: "手肘固定。绳子或直杆都可以。力竭前留 1 到 2 次。",
      py: "shǒu zhǒu gù dìng. shéng zi huò zhí gān dōu kě yǐ. lì jié qián liú 1 dào 2 cì.",
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
      fr: "Technique propre. Trap-bar si le bas du dos fatigue. 2–3 reps en réserve, jamais à l’échec.",
      en: "Clean technique. Use a trap bar if the lower back is tired. Leave 2–3 reps in reserve, never to failure.",
      zh: "动作要标准。腰累了就改六角杠。每组留 2 到 3 次余力，永远不要做到力竭。",
      py: "dòng zuò yào biāo zhǔn. yāo lèi le jiù gǎi liù jiǎo gàng. měi zǔ liú 2 dào 3 cì yú lì, yǒng yuǎn bú yào zuò dào lì jié.",
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
      fr: "Plus léger que le squat du mardi. Torse droit. 1–3 reps en réserve.",
      en: "Lighter than Tuesday’s squat. Torso upright. Leave 1–3 reps in reserve.",
      zh: "比周二的深蹲轻一点。上身直立。每组留 1 到 3 次余力。",
      py: "bǐ zhōu èr de shēn dūn qīng yì diǎn. shàng shēn zhí lì. měi zǔ liú 1 dào 3 cì yú lì.",
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
      fr: "Genou avant dans l’axe. Haltères aux côtés. Stoppe 1–2 reps avant l’échec.",
      en: "Front knee in line. Dumbbells at your sides. Stop 1–2 reps before failure.",
      zh: "前膝对准脚尖。手里拿哑铃。力竭前留 1 到 2 次。",
      py: "qián xī duì zhǔn jiǎo jiān. shǒu lǐ ná yǎ líng. lì jié qián liú 1 dào 2 cì.",
    },
  },
  "Mollets assis": {
    name: { fr: "Mollets assis", en: "Seated calf raise", zh: "坐姿提踵", py: "zuò zī tí zhǒng" },
    notes: {
      fr: "Soléaire. Pause 1 s en bas. Amplitude complète.",
      en: "Soleus. Pause 1 s at the bottom. Full range.",
      zh: "练比目鱼肌。最低点停 1 秒。幅度做满。",
      py: "liàn bǐ mù yú jī. zuì dī diǎn tíng 1 miǎo. fú dù zuò mǎn.",
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
      fr: "Stabilité latérale. Genou sur le banc pour commencer, cheville plus tard.",
      en: "Lateral stability. Knee on the bench to start, ankle later.",
      zh: "侧向稳定。先把膝盖放在凳上，再进阶到脚踝。",
      py: "cè xiàng wěn dìng. xiān bǎ xī gài fàng zài dèng shàng, zài jìn jiē dào jiǎo huái.",
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
