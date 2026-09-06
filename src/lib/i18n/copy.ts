import type { Line, Locale } from "./index";
import { t } from "./index";

export const copy = {
  navHome: { fr: "Accueil", en: "Home", zh: "首页", py: "shǒu yè" },
  navFood: { fr: "Repas", en: "Meals", zh: "饮食", py: "yǐn shí" },
  navGym: { fr: "Salle", en: "Gym", zh: "训练", py: "xùn liàn" },
  navWeight: { fr: "Poids", en: "Weight", zh: "体重", py: "tǐ zhòng" },
  navCoach: { fr: "Coach", en: "Coach", zh: "教练", py: "jiào liàn" },
  navHomeShort: { fr: "Home", en: "Home", zh: "首页", py: "shǒu yè" },
  navFoodShort: { fr: "Repas", en: "Eat", zh: "吃", py: "chī" },
  navGymShort: { fr: "Salle", en: "Gym", zh: "练", py: "liàn" },
  navWeightShort: { fr: "Poids", en: "Scale", zh: "秤", py: "chèng" },
  navCoachShort: { fr: "Coach", en: "Coach", zh: "教", py: "jiào" },
  tagline: {
    fr: "Coche tes repas. Note ton poids. Upper/Lower 4 jours.",
    en: "Check off meals. Log your weight. Upper/Lower, 4 days.",
    zh: "勾选三餐，记录体重。上肢/下肢，每周 4 练。",
    py: "gōu xuǎn sān cān, jì lù tǐ zhòng. shàng zhī / xià zhī, měi zhōu 4 liàn.",
  },
  authSignInTitle: {
    fr: "Connexion",
    en: "Sign in",
    zh: "登录",
    py: "dēng lù",
  },
  authSignUpTitle: {
    fr: "Créer un compte",
    en: "Create an account",
    zh: "创建账号",
    py: "chuàng jiàn zhàng hào",
  },
  authLead: {
    fr: "Tes repas, pesées et séances sont sauvegardés en ligne. Un compte, tous tes appareils.",
    en: "Your meals, weigh-ins, and workouts are saved online. One account, every device.",
    zh: "三餐、体重和训练都会存到网上。一个账号，所有设备都能看。",
    py: "sān cān, tǐ zhòng hé xùn liàn dōu huì cún dào wǎng shàng. yí gè zhàng hào, suǒ yǒu shè bèi dōu néng kàn.",
  },
  authEmail: { fr: "Email", en: "Email", zh: "邮箱", py: "yóu xiāng" },
  authPassword: { fr: "Mot de passe", en: "Password", zh: "密码", py: "mì mǎ" },
  authName: { fr: "Prénom", en: "Name", zh: "名字", py: "míng zi" },
  authSignIn: { fr: "Se connecter", en: "Sign in", zh: "登录", py: "dēng lù" },
  authSigningIn: { fr: "Connexion…", en: "Signing in…", zh: "登录中…", py: "dēng lù zhōng" },
  authCreate: { fr: "Créer le compte", en: "Create account", zh: "创建账号", py: "chuàng jiàn zhàng hào" },
  authCreating: { fr: "Création…", en: "Creating…", zh: "创建中…", py: "chuàng jiàn zhōng" },
  authNeedAccount: {
    fr: "Pas encore de compte ? Inscription",
    en: "No account yet? Sign up",
    zh: "还没有账号？去注册",
    py: "hái méi yǒu zhàng hào? qù zhù cè",
  },
  authHaveAccount: {
    fr: "Déjà un compte ? Connexion",
    en: "Already have an account? Sign in",
    zh: "已有账号？去登录",
    py: "yǐ yǒu zhàng hào? qù dēng lù",
  },
  authSignOut: { fr: "Déconnexion", en: "Sign out", zh: "退出", py: "tuì chū" },
  loading: { fr: "Chargement…", en: "Loading…", zh: "加载中…", py: "jiā zài zhōng" },
  loadingLog: {
    fr: "Ouverture du carnet…",
    en: "Opening your log…",
    zh: "正在打开记录…",
    py: "zhèng zài dǎ kāi jì lù",
  },

  homeTitle: {
    fr: "Passe de 83 à 90 kg, 0,2 à 0,4 kg par semaine.",
    en: "Go from 83 to 90 kg — 0.2 to 0.4 kg a week.",
    zh: "从 83 公斤到 90 公斤，每周增加 0.2 到 0.4 公斤。",
    py: "cóng 83 gōng jīn dào 90 gōng jīn, měi zhōu zēng jiā 0.2 dào 0.4 gōng jīn.",
  },
  weeklyAvg: {
    fr: "Moyenne de la semaine",
    en: "Weekly average",
    zh: "本周平均体重",
    py: "běn zhōu píng jūn tǐ zhòng",
  },
  weighIns: {
    fr: "pesée(s)",
    en: "weigh-in(s)",
    zh: "次称重",
    py: "cì chēng zhòng",
  },
  todayGym: {
    fr: "Séance du jour",
    en: "Today’s workout",
    zh: "今天的训练",
    py: "jīn tiān de xùn liàn",
  },
  rest: { fr: "repos", en: "rest", zh: "休息", py: "xiū xi" },
  openSession: {
    fr: "Commencer la séance",
    en: "Start the workout",
    zh: "开始训练",
    py: "kāi shǐ xùn liàn",
  },
  askCoach: {
    fr: "Demander une séance",
    en: "Ask for a workout",
    zh: "请教练排课",
    py: "qǐng jiào liàn pái kè",
  },
  todayPlate: {
    fr: "Protéines du jour",
    en: "Today’s protein",
    zh: "今天的蛋白质",
    py: "jīn tiān de dàn bái zhì",
  },
  proteinUnit: { fr: "g prot", en: "g protein", zh: "克蛋白质", py: "kè dàn bái zhì" },
  kcalChecked: {
    fr: "kcal cochées",
    en: "kcal checked",
    zh: "已勾选千卡",
    py: "yǐ gōu xuǎn qiān kǎ",
  },
  proteinHint: {
    fr: "Vise 120–165 g. S’il en manque, ajoute œufs, tofu, yaourt ou whey.",
    en: "Aim for 120–165 g. If you are short, add eggs, tofu, yogurt, or whey.",
    zh: "目标 120 到 165 克。不够就加鸡蛋、豆腐、酸奶或蛋白粉。",
    py: "mù biāo 120 dào 165 kè. bù gòu jiù jiā jī dàn, dòu fu, suān nǎi huò dàn bái fěn.",
  },
  denseTitle: {
    fr: "Calories denses, petit volume",
    en: "More calories, less chewing",
    zh: "热量高、体积小",
    py: "rè liàng gāo, tǐ jī xiǎo",
  },
  denseLead: {
    fr: "Riz, avoine et noix augmentent les calories sans un énorme assiette. Les noix aident, elles ne remplacent pas un repas.",
    en: "Rice, oats, and nuts raise calories without a huge plate. Nuts help. They do not replace a meal.",
    zh: "米饭、燕麦和坚果能加热量，又不用吃很大一盘。坚果有用，但不能代替正餐。",
    py: "mǐ fàn, yàn mài hé jiān guǒ néng jiā rè liàng, yòu bú yòng chī hěn dà yì pán. jiān guǒ yǒu yòng, dàn bù néng dài tì zhèng cān.",
  },
  plates: { fr: "Progression", en: "Progress", zh: "进度", py: "jìn dù" },
  ofPath: { fr: "du chemin", en: "of the way", zh: "已完成", py: "yǐ wán chéng" },

  nutKicker: {
    fr: "Aliments faciles à trouver en Chine",
    en: "Foods easy to find in China",
    zh: "在中国容易买到的食物",
    py: "zài zhōng guó róng yì mǎi dào de shí wù",
  },
  nutTitle: {
    fr: "Ajoute 300 à 500 kcal par jour, surtout avec 2 collations.",
    en: "Add 300–500 kcal a day, mostly with two snacks.",
    zh: "每天多吃 300 到 500 千卡，主要靠两顿加餐。",
    py: "měi tiān duō chī 300 dào 500 qiān kǎ, zhǔ yào kào liǎng dùn jiā cān.",
  },
  nutLead: {
    fr: "Pas besoin de te forcer à manger énorme. Noix, lait entier, avoine et une cuillère d’huile suffisent à faire monter les calories.",
    en: "You do not need a huge plate. Nuts, whole milk, oats, and a spoon of oil are enough to raise calories.",
    zh: "不用硬吃很大一份。坚果、全脂牛奶、燕麦和一勺油就够加热量。",
    py: "bú yòng yìng chī hěn dà yí fèn. jiān guǒ, quán zhī niú nǎi, yàn mài hé yì sháo yóu jiù gòu jiā rè liàng.",
  },
  protein: { fr: "Protéines", en: "Protein", zh: "蛋白质", py: "dàn bái zhì" },
  kcalLogged: {
    fr: "Calories cochées",
    en: "Calories checked",
    zh: "已勾选热量",
    py: "yǐ gōu xuǎn rè liàng",
  },
  nuts: { fr: "Noix", en: "Nuts", zh: "坚果", py: "jiān guǒ" },
  proteinOk: {
    fr: "dans la fourchette",
    en: "in range",
    zh: "已达标",
    py: "yǐ dá biāo",
  },
  proteinLow: {
    fr: "ajoute encore un repas protéiné",
    en: "add one more protein serving",
    zh: "再加一份蛋白质",
    py: "zài jiā yí fèn dàn bái zhì",
  },
  boostersTitle: {
    fr: "Si le poids stagne : +150–200 kcal",
    en: "If weight stalls: +150–200 kcal",
    zh: "如果体重不涨：每天再加 150 到 200 千卡",
    py: "rú guǒ tǐ zhòng bù zhǎng: měi tiān zài jiā 150 dào 200 qiān kǎ",
  },
  boostersLead: {
    fr: "Coche un ajout par jour. Pas des nouilles instantanées ni des sodas.",
    en: "Check one extra item a day. Skip instant noodles and soda.",
    zh: "每天多勾一项。不要靠方便面和汽水。",
    py: "měi tiān duō gōu yí xiàng. bú yào kào fāng biàn miàn hé qì shuǐ.",
  },
  add: { fr: "ajouter", en: "add", zh: "添加", py: "tiān jiā" },
  added: { fr: "ajouté", en: "added", zh: "已添加", py: "yǐ tiān jiā" },
  trayTitle: { fr: "Plateau du jour", en: "Today’s tray", zh: "今天的餐盘", py: "jīn tiān de cān pán" },
  canteen: { fr: "Repas", en: "Meals", zh: "三餐", py: "sān cān" },

  wKicker: {
    fr: "3 pesées par semaine, au réveil",
    en: "3 weigh-ins a week, in the morning",
    zh: "每周称 3 次，起床后空腹",
    py: "měi zhōu chēng 3 cì, qǐ chuáng hòu kōng fù",
  },
  wTitle: {
    fr: "Pèse-toi 3 fois, puis utilise la moyenne.",
    en: "Weigh in 3 times, then use the average.",
    zh: "称三次，再看平均值。",
    py: "chēng sān cì, zài kàn píng jūn zhí.",
  },
  wLead: {
    fr: "Objectif : +0,2 à +0,4 kg par semaine. Une seule pesée ne compte pas. Si ça stagne 2 semaines, ajoute 150–200 kcal.",
    en: "Target: +0.2 to +0.4 kg a week. One weigh-in is not enough. If it stalls for 2 weeks, add 150–200 kcal.",
    zh: "目标：每周增加 0.2 到 0.4 公斤。只称一次不够。如果两周不涨，再加 150 到 200 千卡。",
    py: "mù biāo: měi zhōu zēng jiā 0.2 dào 0.4 gōng jīn. zhǐ chēng yí cì bù gòu. rú guǒ liǎng zhōu bù zhǎng, zài jiā 150 dào 200 qiān kǎ.",
  },
  wakeWeight: {
    fr: "Poids au réveil",
    en: "Morning weight",
    zh: "起床体重",
    py: "qǐ chuáng tǐ zhòng",
  },
  date: { fr: "Date", en: "Date", zh: "日期", py: "rì qī" },
  save: { fr: "Enregistrer", en: "Save weigh-in", zh: "保存体重", py: "bǎo cún tǐ zhòng" },
  weeklyAvgs: {
    fr: "Moyennes hebdo",
    en: "Weekly averages",
    zh: "每周平均",
    py: "měi zhōu píng jūn",
  },
  notEnough: { fr: "pas assez", en: "not enough", zh: "次数不够", py: "cì shù bù gòu" },
  usefulWeighs: {
    fr: "pesées utiles",
    en: "useful weigh-ins",
    zh: "有效称重",
    py: "yǒu xiào chēng zhòng",
  },
  history: { fr: "Historique", en: "History", zh: "记录", py: "jì lù" },
  noEntries: {
    fr: "Aucune pesée pour l’instant.",
    en: "No weigh-ins yet.",
    zh: "还没有体重记录。",
    py: "hái méi yǒu tǐ zhòng jì lù.",
  },
  remove: { fr: "retirer", en: "remove", zh: "删除", py: "shān chú" },
  thisWeek: { fr: "Cette semaine", en: "This week", zh: "本周", py: "běn zhōu" },
  chartAria: {
    fr: "Courbe de poids",
    en: "Weight chart",
    zh: "体重曲线",
    py: "tǐ zhòng qū xiàn",
  },
  goal: { fr: "objectif", en: "goal", zh: "目标", py: "mù biāo" },

  tKicker: {
    fr: "Upper / Lower · 4 séances",
    en: "Upper / Lower · 4 sessions",
    zh: "上肢 / 下肢 · 每周 4 练",
    py: "shàng zhī / xià zhī · měi zhōu 4 liàn",
  },
  tTitle: {
    fr: "4 jours : masse, jambes solides, dos et tronc stables.",
    en: "4 days: mass, strong legs, a stable back and core.",
    zh: "每周 4 练：增肌、打腿、把背和核心练稳。",
    py: "měi zhōu 4 liàn: zēng jī, dǎ tuǐ, bǎ bèi hé hé xīn liàn wěn.",
  },
  tLead: {
    fr: "Upper A, Lower A, repos, Upper B, Lower B. Les lombaires travaillent déjà avec squat, RDL, deadlift, rowing et hip thrust. Cou très léger. 1–3 reps en réserve.",
    en: "Upper A, Lower A, rest, Upper B, Lower B. Your lower back already works on squat, RDL, deadlift, row, and hip thrust. Keep neck work very light. Leave 1–3 reps in reserve.",
    zh: "上肢 A、下肢 A、休息、上肢 B、下肢 B。深蹲、罗马尼亚硬拉、硬拉、划船和臀推已经练到腰。颈部只做很轻的量。每组留 1 到 3 次余力。",
    py: "shàng zhī A, xià zhī A, xiū xi, shàng zhī B, xià zhī B. shēn dūn, luó mǎ ní yà yìng lā, yìng lā, huá chuán hé tún tuī yǐ jīng liàn dào yāo. jǐng bù zhǐ zuò hěn qīng de liàng. měi zǔ liú 1 dào 3 cì yú lì.",
  },
  loggedSessions: {
    fr: "Séances notées",
    en: "Logged workouts",
    zh: "已记录的训练",
    py: "yǐ jì lù de xùn liàn",
  },
  done: { fr: "faite", en: "done", zh: "已完成", py: "yǐ wán chéng" },
  open: { fr: "ouverte", en: "open", zh: "进行中", py: "jìn xíng zhōng" },
  startHint: {
    fr: "Choisis une séance type, ou demande-en une au coach.",
    en: "Pick a template, or ask the coach for a workout.",
    zh: "选一套现成训练，或让教练给你排课。",
    py: "xuǎn yí tào xiàn chéng xùn liàn, huò ràng jiào liàn gěi nǐ pái kè.",
  },
  sessionsToday: {
    fr: "séance(s) aujourd’hui",
    en: "workout(s) today",
    zh: "今天已练",
    py: "jīn tiān yǐ liàn",
  },
  restTimer: { fr: "Repos", en: "Rest", zh: "休息", py: "xiū xi" },
  markDone: {
    fr: "Marquer la séance comme faite",
    en: "Mark workout complete",
    zh: "标记训练完成",
    py: "biāo jì xùn liàn wán chéng",
  },
  sets: { fr: "séries", en: "sets", zh: "组", py: "zǔ" },
  set: { fr: "série", en: "set", zh: "组", py: "zǔ" },
  upperA: { fr: "Upper A", en: "Upper A", zh: "上肢 A", py: "shàng zhī A" },
  lowerA: { fr: "Lower A", en: "Lower A", zh: "下肢 A", py: "xià zhī A" },
  upperB: { fr: "Upper B", en: "Upper B", zh: "上肢 B", py: "shàng zhī B" },
  lowerB: { fr: "Lower B", en: "Lower B", zh: "下肢 B", py: "xià zhī B" },
  ruleIntensityTitle: {
    fr: "Intensité",
    en: "Intensity",
    zh: "强度",
    py: "qiáng dù",
  },
  ruleIntensityDetail: {
    fr: "Garde 1–3 reps en réserve. 2–3 min de repos sur les lourds, 60–120 s sur les isolations. Quand tu atteins le haut de la fourchette partout, +2,5 à 5 %. Semaine plus légère toutes les 6–10 semaines si tu es fatigué.",
    en: "Leave 1–3 reps in reserve. Rest 2–3 min on heavy lifts, 60–120 s on isolation. When you hit the top of the range on every set, add 2.5–5%. Take a lighter week every 6–10 weeks if you are tired.",
    zh: "每组留 1 到 3 次余力。重动作休息 2 到 3 分钟，孤立动作 60 到 120 秒。所有组都做到区间上限，就加 2.5% 到 5%。每 6 到 10 周如果很累，做一周减载。",
    py: "měi zǔ liú 1 dào 3 cì yú lì. zhòng dòng zuò xiū xi 2 dào 3 fēn zhōng, gū lì dòng zuò 60 dào 120 miǎo. suǒ yǒu zǔ dōu zuò dào qū jiān shàng xiàn, jiù jiā 2.5% dào 5%. měi 6 dào 10 zhōu rú guǒ hěn lèi, zuò yì zhōu jiǎn zài.",
  },
  ruleBackTitle: {
    fr: "Lombaires",
    en: "Lower back",
    zh: "腰部",
    py: "yāo bù",
  },
  ruleBackDetail: {
    fr: "Squat, RDL, deadlift, rowing et hip thrust suffisent. Pas d’extensions lombaires à l’échec. Mercredi : marche et mobilité, pas de séance lombaire intense.",
    en: "Squat, RDL, deadlift, row, and hip thrust are enough. Do not take back extensions to failure. Wednesday: walk and mobility, no hard lower-back work.",
    zh: "深蹲、罗马尼亚硬拉、硬拉、划船和臀推已经够了。不要把腰部伸展做到力竭。周三只散步和活动，不要狠练腰。",
    py: "shēn dūn, luó mǎ ní yà yìng lā, yìng lā, huá chuán hé tún tuī yǐ jīng gòu le. bú yào bǎ yāo bù shēn zhǎn zuò dào lì jié. zhōu sān zhǐ sàn bù hé huó dòng, bú yào hěn liàn yāo.",
  },
  ruleAbsTitle: {
    fr: "Abdominaux",
    en: "Abs",
    zh: "腹部",
    py: "fù bù",
  },
  ruleAbsDetail: {
    fr: "Flexion : ab wheel ou relevés de jambes. Anti-extension : ab wheel. Anti-rotation : Pallof. Latéral : Copenhagen et side plank.",
    en: "Flexion: ab wheel or leg raises. Anti-extension: ab wheel. Anti-rotation: Pallof. Side stability: Copenhagen and side plank.",
    zh: "屈曲：腹轮或举腿。抗伸展：腹轮。抗旋转：帕洛夫推。侧向稳定：哥本哈根支撑和侧平板。",
    py: "qū qū: fù lún huò jǔ tuǐ. kàng shēn zhǎn: fù lún. kàng xuán zhuǎn: pà luò fū tuī. cè xiàng wěn dìng: gē běn hā gēn zhī chēng hé cè píng bǎn.",
  },
  ruleNeckTitle: {
    fr: "Cou",
    en: "Neck",
    zh: "颈部",
    py: "jǐng bù",
  },
  ruleNeckDetail: {
    fr: "Flexion, extension, très léger, 15–20 reps, sans douleur. Pour le combat plus tard, un préparateur spécialisé sera mieux.",
    en: "Flexion and extension, very light, 15–20 reps, no pain. For fighting later, a specialist coach is better.",
    zh: "屈伸都要很轻，15 到 20 次，不能疼。以后要打对抗，最好找专项教练。",
    py: "qū shēn dōu yào hěn qīng, 15 dào 20 cì, bù néng téng. yǐ hòu yào dǎ duì kàng, zuì hǎo zhǎo zhuān xiàng jiào liàn.",
  },

  cKicker: {
    fr: "Coach musculation",
    en: "Lifting coach",
    zh: "力量训练教练",
    py: "lì liàng xùn liàn jiào liàn",
  },
  cTitle: {
    fr: "Demande une séance, ou comment faire un mouvement.",
    en: "Ask for a workout, or how to do a lift.",
    zh: "问今天练什么，或问动作怎么做。",
    py: "wèn jīn tiān liàn shén me, huò wèn dòng zuò zěn me zuò.",
  },
  cLead: {
    fr: "Le coach suit ton Upper/Lower 4 jours, ton objectif 83 → 90 kg, tes protéines, et les aliments faciles à trouver en Chine.",
    en: "The coach follows your 4-day Upper/Lower, your 83 → 90 kg goal, your protein target, and foods that are easy to find in China.",
    zh: "教练按你的上肢/下肢四日课来排，也知道 83 到 90 公斤、蛋白质目标和中国常见食物。",
    py: "jiào liàn àn nǐ de shàng zhī / xià zhī sì rì kè lái pái, yě zhī dào 83 dào 90 gōng jīn, dàn bái zhì mù biāo hé zhōng guó cháng jiàn shí wù.",
  },
  generated: {
    fr: "Séance générée",
    en: "Generated workout",
    zh: "已生成的训练",
    py: "yǐ shēng chéng de xùn liàn",
  },
  gymCoach: { fr: "Coach salle", en: "Gym coach", zh: "健身房教练", py: "jiàn shēn fáng jiào liàn" },
  whatToday: {
    fr: "Que faire aujourd’hui",
    en: "What to do today",
    zh: "今天练什么",
    py: "jīn tiān liàn shén me",
  },
  send: { fr: "Envoyer", en: "Send", zh: "发送", py: "fā sòng" },
  generateSession: {
    fr: "Générer une séance complète",
    en: "Generate a full workout",
    zh: "生成一整套训练",
    py: "shēng chéng yì zhěng tào xùn liàn",
  },
  coachError: {
    fr: "Le coach n’a pas répondu.",
    en: "The coach did not reply.",
    zh: "教练没有回复。",
    py: "jiào liàn méi yǒu huí fù.",
  },
  emptyStream: { fr: "Flux vide.", en: "Empty reply.", zh: "回复是空的。", py: "huí fù shì kōng de." },
  coachFail: { fr: "Erreur coach", en: "Coach error", zh: "教练出错", py: "jiào liàn chū cuò" },
  placeholder: {
    fr: "Ex. Comment faire un développé couché ?",
    en: "Ex. How do I bench press?",
    zh: "例如：卧推怎么做？",
    py: "lì rú: wò tuī zěn me zuò?",
  },
  sessionReady: {
    fr: "Séance prête",
    en: "Workout ready",
    zh: "训练已准备好",
    py: "xùn liàn yǐ zhǔn bèi hǎo",
  },
  starter1: {
    fr: "Fais-moi une séance de 60 minutes, salle complète.",
    en: "Give me a 60-minute gym workout.",
    zh: "给我一套 60 分钟的健身房训练。",
    py: "gěi wǒ yí tào 60 fēn zhōng de jiàn shēn fáng xùn liàn.",
  },
  starter2: {
    fr: "Comment exécuter un squat correctement ?",
    en: "How do I squat with good form?",
    zh: "深蹲怎么做才标准？",
    py: "shēn dūn zěn me zuò cái biāo zhǔn?",
  },
  starter3: {
    fr: "J’ai seulement haltères et barre. Que faire ?",
    en: "I only have dumbbells and a bar. What should I do?",
    zh: "我只有哑铃和杠铃，练什么？",
    py: "wǒ zhǐ yǒu yǎ líng hé gàng líng, liàn shén me?",
  },
  starter4: {
    fr: "Séance tirage, genou un peu sensible.",
    en: "A pull workout. My knee is a bit sore.",
    zh: "拉的训练，膝盖有点不舒服。",
    py: "lā de xùn liàn, xī gài yǒu diǎn bù shū fu.",
  },
  generatePrompt: {
    fr: "Fais-moi la séance Upper/Lower prévue aujourd’hui, avec les séries et le repos.",
    en: "Give me today’s Upper/Lower session, with sets and rest.",
    zh: "给我今天该练的上肢/下肢课，带组数和休息。",
    py: "gěi wǒ jīn tiān gāi liàn de shàng zhī / xià zhī kè, dài zǔ shù hé xiū xi.",
  },

  plateauWarmTitle: {
    fr: "Pas encore assez de pesées",
    en: "Not enough weigh-ins yet",
    zh: "称重次数还不够",
    py: "chēng zhòng cì shù hái bù gòu",
  },
  plateauWarmDetail: {
    fr: "Pèse-toi 3 fois par semaine au réveil, puis on fera la moyenne. C’est trop tôt pour juger.",
    en: "Weigh in 3 times a week in the morning, then we use the average. It is too early to judge.",
    zh: "每周起床称 3 次，再看平均值。现在判断还太早。",
    py: "měi zhōu qǐ chuáng chēng 3 cì, zài kàn píng jūn zhí. xiàn zài pàn duàn hái tài zǎo.",
  },
  plateauUpDetail: {
    fr: "Le surplus fonctionne. Garde le même rythme alimentaire.",
    en: "The surplus is working. Keep eating the same way.",
    zh: "热量盈余有效。饮食节奏先不要改。",
    py: "rè liàng yíng yú yǒu xiào. yǐn shí jié zòu xiān bú yào gǎi.",
  },
  plateauStuckTitle: {
    fr: "Le poids stagne depuis 2 semaines",
    en: "Weight has stalled for 2 weeks",
    zh: "体重已经两周没涨",
    py: "tǐ zhòng yǐ jīng liǎng zhōu méi zhǎng",
  },
  plateauStuckDetail: {
    fr: "Ajoute 150–200 kcal par jour : 30 g de cacahuètes, un verre de lait, une portion de riz ou une cuillère de beurre de cacahuète.",
    en: "Add 150–200 kcal a day: 30 g peanuts, a glass of milk, extra rice, or a spoon of peanut butter.",
    zh: "每天再加 150 到 200 千卡：30 克花生、一杯牛奶、多一碗米饭，或一勺花生酱。",
    py: "měi tiān zài jiā 150 dào 200 qiān kǎ: 30 kè huā shēng, yì bēi niú nǎi, duō yì wǎn mǐ fàn, huò yì sháo huā shēng jiàng.",
  },
  plateauFlatTitle: {
    fr: "Pas de hausse nette cette semaine",
    en: "No clear gain this week",
    zh: "这周体重没有明显增加",
    py: "zhè zhōu tǐ zhòng méi yǒu míng xiǎn zēng jiā",
  },
  plateauFlatDetail: {
    fr: "Attends encore quelques pesées. Si ça ne bouge pas la semaine prochaine, ajoute 150–200 kcal.",
    en: "Wait for a few more weigh-ins. If it still does not move next week, add 150–200 kcal.",
    zh: "先再称几次。如果下周还不涨，再加 150 到 200 千卡。",
    py: "xiān zài chēng jǐ cì. rú guǒ xià zhōu hái bù zhǎng, zài jiā 150 dào 200 qiān kǎ.",
  },

  dayMon: { fr: "Lundi", en: "Monday", zh: "周一", py: "zhōu yī" },
  dayTue: { fr: "Mardi", en: "Tuesday", zh: "周二", py: "zhōu èr" },
  dayWed: { fr: "Mercredi", en: "Wednesday", zh: "周三", py: "zhōu sān" },
  dayThu: { fr: "Jeudi", en: "Thursday", zh: "周四", py: "zhōu sì" },
  dayFri: { fr: "Vendredi", en: "Friday", zh: "周五", py: "zhōu wǔ" },
  daySat: { fr: "Samedi", en: "Saturday", zh: "周六", py: "zhōu liù" },
  daySun: { fr: "Dimanche", en: "Sunday", zh: "周日", py: "zhōu rì" },
  noteWalk: {
    fr: "Marche, mobilité, manger.",
    en: "Walk, mobility, eat.",
    zh: "散步、活动关节、好好吃饭。",
    py: "sàn bù, huó dòng guān jié, hǎo hǎo chī fàn.",
  },
  noteRestBack: {
    fr: "Marche, mobilité légère. Pas de séance lombaire intense.",
    en: "Walk and light mobility. No hard lower-back work.",
    zh: "散步和轻度活动。不要狠练腰。",
    py: "sàn bù hé qīng dù huó dòng. bú yào hěn liàn yāo.",
  },
  noteRestSmoothie: {
    fr: "Repos. Smoothie du soir si l’appétit baisse.",
    en: "Rest. Use the evening smoothie if appetite is low.",
    zh: "休息。胃口不好就喝晚上的奶昔。",
    py: "xiū xi. wèi kǒu bù hǎo jiù hē wǎn shang de nǎi xī.",
  },
  noteOptional: {
    fr: "Optionnel, si tu tiens 4–5 séances.",
    en: "Optional, if you can do 4–5 sessions.",
    zh: "可选。如果你能练满 4 到 5 次。",
    py: "kě xuǎn. rú guǒ nǐ néng liàn mǎn 4 dào 5 cì.",
  },
  noteRest: {
    fr: "Repos complet.",
    en: "Full rest.",
    zh: "完全休息。",
    py: "wán quán xiū xi.",
  },

  mealBreakfast: { fr: "Petit-déjeuner", en: "Breakfast", zh: "早餐", py: "zǎo cān" },
  mealLunch: { fr: "Déjeuner", en: "Lunch", zh: "午餐", py: "wǔ cān" },
  mealSnack: { fr: "Collation", en: "Snack", zh: "加餐", py: "jiā cān" },
  mealDinner: { fr: "Dîner", en: "Dinner", zh: "晚餐", py: "wǎn cān" },
  mealNight: { fr: "Avant de dormir", en: "Before bed", zh: "睡前", py: "shuì qián" },
  hintBreakfast: {
    fr: "Un vrai repas le matin, sans te forcer sur le volume.",
    en: "A full breakfast, without forcing a huge volume.",
    zh: "早上吃够，但不必硬吃很大一份。",
    py: "zǎo shang chī gòu, dàn bú bì yìng chī hěn dà yí fèn.",
  },
  hintLunch: {
    fr: "Le plus facile à charger : riz + viande + tofu.",
    en: "The easiest meal to load: rice + meat + tofu.",
    zh: "最容易加量：米饭 + 肉 + 豆腐。",
    py: "zuì róng yì jiā liàng: mǐ fàn + ròu + dòu fu.",
  },
  hintSnack: {
    fr: "Les noix servent ici : beaucoup de calories, petit volume.",
    en: "This is where nuts help: lots of calories, small volume.",
    zh: "坚果用在这里：热量高、体积小。",
    py: "jiān guǒ yòng zài zhè lǐ: rè liàng gāo, tǐ jī xiǎo.",
  },
  hintDinner: {
    fr: "Nouilles ou riz, plus une vraie source de protéines.",
    en: "Noodles or rice, plus a real protein source.",
    zh: "面条或米饭，再加一份真正的蛋白质。",
    py: "miàn tiáo huò mǐ fàn, zài jiā yí fèn zhēn zhèng de dàn bái zhì.",
  },
  hintNight: {
    fr: "Le smoothie évite de mâcher un gros repas. Environ 600–800 kcal.",
    en: "The smoothie adds 600–800 kcal without a big meal to chew.",
    zh: "奶昔大约 600 到 800 千卡，不用再嚼一大餐。",
    py: "nǎi xī dà yuē 600 dào 800 qiān kǎ, bú yòng zài jiáo yí dà cān.",
  },

  rice: { fr: "Riz 米饭", en: "Rice 米饭", zh: "米饭", py: "mǐ fàn" },
  riceUse: {
    fr: "Ajouter une portion au déjeuner et au dîner",
    en: "Add one extra serving at lunch and dinner",
    zh: "午饭和晚饭各多加一碗",
    py: "wǔ fàn hé wǎn fàn gè duō jiā yì wǎn",
  },
  oats: { fr: "Avoine 燕麦", en: "Oats 燕麦", zh: "燕麦", py: "yàn mài" },
  oatsUse: {
    fr: "Dans un smoothie ou avec du lait",
    en: "In a smoothie or with milk",
    zh: "打进奶昔，或配牛奶",
    py: "dǎ jìn nǎi xī, huò pèi niú nǎi",
  },
  nutsFood: {
    fr: "Cacahuètes / noix",
    en: "Peanuts / nuts",
    zh: "花生 / 坚果",
    py: "huā shēng / jiān guǒ",
  },
  nutsUse: {
    fr: "Collation de 30–50 g, non sucrées",
    en: "30–50 g snack, unsalted, no sugar",
    zh: "加餐 30 到 50 克，不要甜的",
    py: "jiā cān 30 dào 50 kè, bú yào tián de",
  },
  nutOptions: {
    fr: "30–50 g par jour : cacahuètes, noix, cajou 腰果, amandes 杏仁 ou graines de tournesol 葵花籽. Non sucrées, peu salées.",
    en: "30–50 g a day: peanuts, walnuts, cashews 腰果, almonds 杏仁, or sunflower seeds 葵花籽. Unsweetened, lightly salted.",
    zh: "每天 30 到 50 克：花生、核桃、腰果、杏仁或葵花籽。不要甜的，少盐。",
    py: "měi tiān 30 dào 50 kè: huā shēng, hé tao, yāo guǒ, xìng rén huò kuí huā zǐ. bú yào tián de, shǎo yán.",
  },
} as const satisfies Record<string, Line>;

export type CopyKey = keyof typeof copy;

export function msg(locale: Locale, key: CopyKey) {
  return t(locale, copy[key]);
}

export function homeSub(locale: Locale, bmi: string) {
  return t(locale, {
    fr: `1,92 m · IMC ${bmi} · 120–165 g de protéines · +300–500 kcal · Upper/Lower 4 jours.`,
    en: `1.92 m · BMI ${bmi} · 120–165 g protein · +300–500 kcal · Upper/Lower 4 days.`,
    zh: `身高 1.92 米 · BMI ${bmi} · 蛋白质 120 到 165 克 · 每天多 300 到 500 千卡 · 上肢/下肢每周 4 练。`,
    py: `shēn gāo 1.92 mǐ · BMI ${bmi} · dàn bái zhì 120 dào 165 kè · měi tiān duō 300 dào 500 qiān kǎ · shàng zhī / xià zhī měi zhōu 4 liàn.`,
  });
}

export function proteinTarget(locale: Locale, min: number, max: number, ok: boolean) {
  const status = msg(locale, ok ? "proteinOk" : "proteinLow");
  const statusText = typeof status === "string" ? status : status.zh;
  return t(locale, {
    fr: `Cible ${min}–${max} g · ${statusText}`,
    en: `Target ${min}–${max} g · ${statusText}`,
    zh: `目标 ${min}–${max} 克 · ${typeof status === "string" ? status : status.zh}`,
    py: `mù biāo ${min}–${max} kè · ${typeof status === "string" ? status : status.py}`,
  });
}

export function surplusNote(locale: Locale, extra: number) {
  return t(locale, {
    fr: `Surplus visé +300–500 kcal${extra ? `, plus ${extra} kcal de rattrapage` : ""}`,
    en: `Surplus target +300–500 kcal${extra ? `, plus ${extra} kcal catch-up` : ""}`,
    zh: `热量盈余目标 +300 到 500 千卡${extra ? `，再加 ${extra} 千卡` : ""}`,
    py: `rè liàng yíng yú mù biāo +300 dào 500 qiān kǎ${extra ? `, zài jiā ${extra} qiān kǎ` : ""}`,
  });
}

export function thisWeekGain(locale: Locale, delta: string) {
  return t(locale, {
    fr: `+${delta} kg cette semaine`,
    en: `+${delta} kg this week`,
    zh: `这周增加了 ${delta} 公斤`,
    py: `zhè zhōu zēng jiā le ${delta} gōng jīn`,
  });
}

export function pathLabel(locale: Locale, start: number, target: number, pct: string) {
  return t(locale, {
    fr: `${start} kg → ${target} kg · ${pct} % du chemin`,
    en: `${start} kg → ${target} kg · ${pct}% of the way`,
    zh: `${start} 公斤 → ${target} 公斤 · 已完成 ${pct}%`,
    py: `${start} gōng jīn → ${target} gōng jīn · yǐ wán chéng ${pct}%`,
  });
}

export function sessionReadyText(
  locale: Locale,
  name: string,
  warmup: string,
  lines: string,
  notes: string,
) {
  const ready = msg(locale, "sessionReady");
  const readyPlain = typeof ready === "string" ? ready : ready.zh;
  return `${readyPlain} : ${name}. ${warmup}\n\n${lines}\n\n${notes}`;
}
