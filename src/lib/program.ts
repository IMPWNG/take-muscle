import type { FoodItem, MealSlot, Profile } from "./types";

export const DEFAULT_PROFILE: Profile = {
  heightCm: 192,
  startKg: 83,
  targetKg: 90,
  extraKcal: 0,
};

export const PROTEIN_MIN = 120;
export const PROTEIN_MAX = 165;
export const SURPLUS_MIN = 300;
export const SURPLUS_MAX = 500;
export const WEEKLY_GAIN_MIN = 0.2;
export const WEEKLY_GAIN_MAX = 0.4;

export const MEALS: MealSlot[] = [
  {
    id: "breakfast",
    title: "Petit-déjeuner",
    hint: "Solide dès le matin, sans te forcer sur le volume.",
    items: [
      { id: "b-eggs", label: "3 œufs", zh: "鸡蛋", proteinG: 18, kcal: 210 },
      {
        id: "b-bread",
        label: "2 pains ou mantou",
        zh: "馒头",
        proteinG: 8,
        kcal: 280,
      },
      { id: "b-banana", label: "1 banane", zh: "香蕉", proteinG: 1, kcal: 105 },
      {
        id: "b-milk",
        label: "500 ml de lait ou lait de soja",
        zh: "牛奶 / 豆浆",
        proteinG: 16,
        kcal: 310,
      },
      {
        id: "b-pb",
        label: "1 cuillère de beurre de cacahuète",
        zh: "花生酱",
        proteinG: 4,
        kcal: 95,
      },
    ],
  },
  {
    id: "lunch",
    title: "Déjeuner",
    hint: "Le repas le plus facile à charger : riz + viande + tofu.",
    items: [
      {
        id: "l-rice",
        label: "Riz, 1,5 à 2 bols",
        zh: "米饭",
        proteinG: 8,
        kcal: 400,
      },
      {
        id: "l-meat",
        label: "Poulet, bœuf ou porc 150–200 g",
        zh: "鸡肉 / 牛肉 / 猪肉",
        proteinG: 40,
        kcal: 280,
      },
      { id: "l-veg", label: "Légumes", zh: "蔬菜", proteinG: 3, kcal: 50 },
      { id: "l-tofu", label: "Tofu", zh: "豆腐", proteinG: 10, kcal: 80 },
      {
        id: "l-oil",
        label: "Un peu d’huile dans le plat",
        zh: "菜籽油 / 芝麻油",
        proteinG: 0,
        kcal: 120,
        note: "Colza ou sésame, une cuillère suffit.",
      },
    ],
  },
  {
    id: "snack",
    title: "Collation",
    hint: "C’est ici que les noix servent vraiment : calories denses, petit volume.",
    items: [
      {
        id: "s-yogurt",
        label: "Yaourt entier",
        zh: "酸奶",
        proteinG: 8,
        kcal: 150,
      },
      {
        id: "s-nuts",
        label: "30–40 g de cacahuètes ou noix",
        zh: "花生 / 核桃",
        proteinG: 8,
        kcal: 220,
      },
      { id: "s-fruit", label: "1 fruit", zh: "水果", proteinG: 1, kcal: 80 },
    ],
  },
  {
    id: "dinner",
    title: "Dîner",
    hint: "Nouilles ou riz, plus une vraie source de protéines.",
    items: [
      {
        id: "d-carb",
        label: "Nouilles ou riz",
        zh: "面条 / 米饭",
        proteinG: 8,
        kcal: 350,
      },
      {
        id: "d-protein",
        label: "Poisson, crevettes, poulet ou tofu",
        zh: "鱼 / 虾 / 鸡肉 / 豆腐",
        proteinG: 30,
        kcal: 220,
      },
      {
        id: "d-eggs",
        label: "2 œufs si le repas est pauvre en protéines",
        zh: "鸡蛋",
        proteinG: 12,
        kcal: 140,
      },
      { id: "d-veg", label: "Légumes", zh: "蔬菜", proteinG: 3, kcal: 50 },
    ],
  },
  {
    id: "night",
    title: "Avant de dormir",
    hint: "Le smoothie évite de mâcher un gros repas. Environ 600–800 kcal.",
    items: [
      {
        id: "n-milk",
        label: "500 ml de lait",
        zh: "牛奶",
        proteinG: 16,
        kcal: 310,
      },
      { id: "n-banana", label: "1 banane", zh: "香蕉", proteinG: 1, kcal: 105 },
      {
        id: "n-oats",
        label: "60–80 g d’avoine",
        zh: "燕麦",
        proteinG: 9,
        kcal: 260,
      },
      {
        id: "n-pb",
        label: "1 à 2 cuillères de beurre de cacahuète",
        zh: "花生酱",
        proteinG: 8,
        kcal: 190,
      },
    ],
  },
];

export const BOOSTERS: FoodItem[] = [
  {
    id: "x-peanuts",
    label: "30 g de cacahuètes",
    zh: "花生",
    proteinG: 7,
    kcal: 180,
  },
  {
    id: "x-milk",
    label: "Un verre de lait entier",
    zh: "全脂牛奶",
    proteinG: 8,
    kcal: 150,
  },
  {
    id: "x-rice",
    label: "Une portion de riz en plus",
    zh: "米饭",
    proteinG: 4,
    kcal: 200,
  },
  {
    id: "x-pb",
    label: "Une cuillère de beurre de cacahuète",
    zh: "花生酱",
    proteinG: 4,
    kcal: 95,
  },
];

export const DENSE_FOODS = [
  { food: "Riz 米饭", use: "Ajouter une portion au déjeuner et au dîner" },
  { food: "Avoine 燕麦", use: "Dans un smoothie ou avec du lait" },
  { food: "Cacahuètes / noix", use: "Collation de 30–50 g, non sucrées" },
];

export const NUT_OPTIONS =
  "30–50 g / jour : cacahuètes, noix, cajou 腰果, amandes 杏仁 ou graines de tournesol 葵花籽. Versions non sucrées, peu salées.";

export const ALL_FOODS: FoodItem[] = [
  ...MEALS.flatMap((meal) => meal.items),
  ...BOOSTERS,
];

export function foodById(id: string) {
  return ALL_FOODS.find((item) => item.id === id);
}

export function totalsFor(ids: string[]) {
  return ids.reduce(
    (acc, id) => {
      const food = foodById(id);
      if (!food) return acc;
      acc.proteinG += food.proteinG;
      acc.kcal += food.kcal;
      return acc;
    },
    { proteinG: 0, kcal: 0 },
  );
}

export function bmi(kg: number, heightCm: number) {
  const m = heightCm / 100;
  return kg / (m * m);
}
