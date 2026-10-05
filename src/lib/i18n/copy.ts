import type { Line, Locale } from "./index";
import { t } from "./index";

export const copy = {
  navHome: { fr: "Accueil", en: "Home", zh: "首页", py: "shǒu yè" },
  navFood: { fr: "Nutrition", en: "Nutrition", zh: "营养", py: "yíng yǎng" },
  navGym: { fr: "Entraînement", en: "Training", zh: "训练", py: "xùn liàn" },
  navWeight: { fr: "Poids", en: "Weight", zh: "体重", py: "tǐ zhòng" },
  navHomeShort: { fr: "Home", en: "Home", zh: "首页", py: "shǒu yè" },
  navFoodShort: { fr: "Nutri", en: "Food", zh: "餐", py: "cān" },
  navGymShort: { fr: "Séance", en: "Train", zh: "练", py: "liàn" },
  navWeightShort: { fr: "Poids", en: "Scale", zh: "秤", py: "chèng" },
  tagline: {
    fr: "Objectif 90 kg. Pesées, cycle 12 semaines, coach IA.",
    en: "Target 90 kg. Weigh-ins, 12-week cycle, AI coach.",
    zh: "目标 90 公斤。体重、12 周训练、AI 教练。",
    py: "mù biāo 90 gōng jīn. tǐ zhòng, 12 zhōu xùn liàn, AI jiào liàn.",
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
    fr: "Pesées et séances sont enregistrées en ligne. Un compte, tous tes appareils.",
    en: "Weigh-ins and sessions are saved online. One account, every device.",
    zh: "体重和训练都会存到网上。一个账号，所有设备都能看。",
    py: "tǐ zhòng hé xùn liàn dōu huì cún dào wǎng shàng. yí gè zhàng hào, suǒ yǒu shè bèi dōu néng kàn.",
  },
  authEmail: { fr: "Email", en: "Email", zh: "邮箱", py: "yóu xiāng" },
  authPassword: { fr: "Mot de passe", en: "Password", zh: "密码", py: "mì mǎ" },
  authPasswordHint: {
    fr: "8 caractères minimum",
    en: "8 characters minimum",
    zh: "至少 8 位",
    py: "zhì shǎo 8 wèi",
  },
  authName: { fr: "Prénom", en: "Name", zh: "名字", py: "míng zi" },
  authSignIn: { fr: "Ouvrir le carnet", en: "Open the log", zh: "进入训练日志", py: "jìn rù xùn liàn rì zhì" },
  authSigningIn: { fr: "Connexion…", en: "Signing in…", zh: "登录中…", py: "dēng lù zhōng" },
  authCreate: { fr: "Créer le carnet", en: "Create the log", zh: "创建训练日志", py: "chuàng jiàn xùn liàn rì zhì" },
  authCreating: { fr: "Création…", en: "Creating…", zh: "创建中…", py: "chuàng jiàn zhōng" },
  authNeedAccount: {
    fr: "Pas encore de compte ? Créer le carnet",
    en: "No account yet? Create the log",
    zh: "还没有账号？去创建训练日志",
    py: "hái méi yǒu zhàng hào? qù chuàng jiàn xùn liàn rì zhì",
  },
  authHaveAccount: {
    fr: "Déjà un compte ? Ouvrir le carnet",
    en: "Already have an account? Open the log",
    zh: "已有账号？去进入训练日志",
    py: "yǐ yǒu zhàng hào? qù jìn rù xùn liàn rì zhì",
  },
  authSignOut: { fr: "Déconnexion", en: "Sign out", zh: "退出", py: "tuì chū" },
  authErrorSignIn: {
    fr: "Connexion impossible. Vérifie l’email et le mot de passe.",
    en: "Sign-in failed. Check your email and password.",
    zh: "登录失败。请检查邮箱和密码。",
    py: "dēng lù shī bài. qǐng jiǎn chá yóu xiāng hé mì mǎ.",
  },
  authErrorSignUp: {
    fr: "Inscription impossible. Vérifie l’email et le mot de passe (8 caractères min.).",
    en: "Sign-up failed. Check your email and password (8 characters min.).",
    zh: "注册失败。请检查邮箱和密码（至少 8 位）。",
    py: "zhù cè shī bài. qǐng jiǎn chá yóu xiāng hé mì mǎ (zhì shǎo 8 wèi).",
  },
  loading: { fr: "Chargement…", en: "Loading…", zh: "加载中…", py: "jiā zài zhōng" },
  loadingLog: {
    fr: "Ouverture du carnet…",
    en: "Opening your log…",
    zh: "正在打开记录…",
    py: "zhèng zài dǎ kāi jì lù",
  },

  homeTitle: {
    fr: "Objectif 90 kg",
    en: "Target 90 kg",
    zh: "目标 90 公斤",
    py: "mù biāo 90 gōng jīn",
  },
  weeklyAvg: {
    fr: "Moyenne hebdomadaire",
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
    en: "Today’s session",
    zh: "今天的训练",
    py: "jīn tiān de xùn liàn",
  },
  rest: { fr: "repos", en: "rest", zh: "休息", py: "xiū xi" },
  openSession: {
    fr: "Ouvrir la séance du jour",
    en: "Open today’s session",
    zh: "打开今天的训练",
    py: "dǎ kāi jīn tiān de xùn liàn",
  },
  askCoach: {
    fr: "Demander une séance",
    en: "Ask for a session",
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
    fr: "kcal validées",
    en: "kcal logged",
    zh: "已记录千卡",
    py: "yǐ jì lù qiān kǎ",
  },
  proteinHint: {
    fr: "Objectif : 120–165 g. Si tu es en dessous, ajoute 2 œufs, 150 g de tofu, un yaourt ou une dose de whey.",
    en: "Target: 120–165 g. If you are short, add 2 eggs, 150 g tofu, one yogurt, or one scoop of whey.",
    zh: "目标 120 到 165 克。不够就加 2 个鸡蛋、150 克豆腐、一份酸奶或一勺蛋白粉。",
    py: "mù biāo 120 dào 165 kè. bù gòu jiù jiā 2 gè jī dàn, 150 kè dòu fu, yí fèn suān nǎi huò yì sháo dàn bái fěn.",
  },
  denseTitle: {
    fr: "Calories denses, petit volume",
    en: "Dense calories, small volume",
    zh: "热量高、体积小",
    py: "rè liàng gāo, tǐ jī xiǎo",
  },
  denseLead: {
    fr: "Pour le surplus, augmente le riz, l’avoine et les noix. Les noix complètent un repas, elles ne le remplacent pas.",
    en: "For the surplus, add rice, oats, and nuts. Nuts complete a meal. They do not replace one.",
    zh: "要加热量，就加米饭、燕麦和坚果。坚果是加餐，不能代替正餐。",
    py: "yào jiā rè liàng, jiù jiā mǐ fàn, yàn mài hé jiān guǒ. jiān guǒ shì jiā cān, bù néng dài tì zhèng cān.",
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
    fr: "Objectif : +300 à +500 kcal par jour, surtout via 2 collations.",
    en: "Target: +300–500 kcal a day, mostly from two snacks.",
    zh: "目标：每天多吃 300 到 500 千卡，主要靠两顿加餐。",
    py: "mù biāo: měi tiān duō chī 300 dào 500 qiān kǎ, zhǔ yào kào liǎng dùn jiā cān.",
  },
  nutLead: {
    fr: "Ne force pas un assiette plus grande. Ajoute des calories denses : noix, lait entier, avoine, 1 cuillère d’huile. Coche chaque aliment consommé.",
    en: "Do not force a larger plate. Add dense calories: nuts, whole milk, oats, 1 spoon of oil. Check each food you eat.",
    zh: "不必硬吃很大一份。用高热量食物补：坚果、全脂牛奶、燕麦、1 勺油。吃了就勾选。",
    py: "bú bì yìng chī hěn dà yí fèn. yòng gāo rè liàng shí wù bǔ: jiān guǒ, quán zhī niú nǎi, yàn mài, 1 sháo yóu. chī le jiù gōu xuǎn.",
  },
  protein: { fr: "Protéines", en: "Protein", zh: "蛋白质", py: "dàn bái zhì" },
  kcalLogged: {
    fr: "Calories validées",
    en: "Calories logged",
    zh: "已记录热量",
    py: "yǐ jì lù rè liàng",
  },
  nuts: { fr: "Noix", en: "Nuts", zh: "坚果", py: "jiān guǒ" },
  proteinOk: {
    fr: "objectif atteint",
    en: "target met",
    zh: "已达标",
    py: "yǐ dá biāo",
  },
  proteinLow: {
    fr: "ajoute encore une source de protéines",
    en: "add one more protein source",
    zh: "再加一份蛋白质",
    py: "zài jiā yí fèn dàn bái zhì",
  },
  boostersTitle: {
    fr: "Si le poids stagne 2 semaines : +150–200 kcal",
    en: "If weight stalls for 2 weeks: +150–200 kcal",
    zh: "如果体重两周不涨：每天再加 150 到 200 千卡",
    py: "rú guǒ tǐ zhòng liǎng zhōu bù zhǎng: měi tiān zài jiā 150 dào 200 qiān kǎ",
  },
  boostersLead: {
    fr: "Coche un ajout par jour. Choisis noix, lait, riz ou beurre de cacahuète. Pas de nouilles instantanées ni de sodas.",
    en: "Check one extra item a day. Choose nuts, milk, rice, or peanut butter. Skip instant noodles and soda.",
    zh: "每天多勾一项。选坚果、牛奶、米饭或花生酱。不要靠方便面和汽水。",
    py: "měi tiān duō gōu yí xiàng. xuǎn jiān guǒ, niú nǎi, mǐ fàn huò huā shēng jiàng. bú yào kào fāng biàn miàn hé qì shuǐ.",
  },
  add: { fr: "ajouter", en: "add", zh: "添加", py: "tiān jiā" },
  added: { fr: "ajouté", en: "added", zh: "已添加", py: "yǐ tiān jiā" },
  trayTitle: { fr: "Suivi du jour", en: "Today’s log", zh: "今天的餐盘", py: "jīn tiān de cān pán" },
  canteen: { fr: "Repas", en: "Meals", zh: "三餐", py: "sān cān" },

  wKicker: {
    fr: "Protocole : 3 pesées / semaine, au réveil, à jeun",
    en: "Protocol: 3 weigh-ins / week, after waking, fasted",
    zh: "方法：每周称 3 次，起床后空腹",
    py: "fāng fǎ: měi zhōu chēng 3 cì, qǐ chuáng hòu kōng fù",
  },
  wTitle: {
    fr: "Pèse-toi 3 fois au réveil. Décide sur la moyenne, pas sur une pesée.",
    en: "Weigh in 3 times after waking. Decide from the average, not one reading.",
    zh: "起床称三次。看平均值，不要只看一次。",
    py: "qǐ chuáng chēng sān cì. kàn píng jūn zhí, bú yào zhǐ kàn yí cì.",
  },
  wLead: {
    fr: "Objectif : +0,2 à +0,4 kg par semaine. Une seule pesée ne compte pas. Si la moyenne stagne 2 semaines, ajoute 150–200 kcal par jour.",
    en: "Target: +0.2 to +0.4 kg a week. One weigh-in is not enough. If the average stalls for 2 weeks, add 150–200 kcal a day.",
    zh: "目标：每周增加 0.2 到 0.4 公斤。只称一次不够。如果平均值两周不涨，每天再加 150 到 200 千卡。",
    py: "mù biāo: měi zhōu zēng jiā 0.2 dào 0.4 gōng jīn. zhǐ chēng yí cì bù gòu. rú guǒ píng jūn zhí liǎng zhōu bù zhǎng, měi tiān zài jiā 150 dào 200 qiān kǎ.",
  },
  wakeWeight: {
    fr: "Poids au réveil (kg)",
    en: "Morning weight (kg)",
    zh: "起床体重（公斤）",
    py: "qǐ chuáng tǐ zhòng (gōng jīn)",
  },
  date: { fr: "Date", en: "Date", zh: "日期", py: "rì qī" },
  save: { fr: "Enregistrer la pesée", en: "Save weigh-in", zh: "保存体重", py: "bǎo cún tǐ zhòng" },
  weeklyAvgs: {
    fr: "Moyennes hebdomadaires",
    en: "Weekly averages",
    zh: "每周平均",
    py: "měi zhōu píng jūn",
  },
  notEnough: { fr: "moins de 3 pesées", en: "fewer than 3 weigh-ins", zh: "次数不够", py: "cì shù bù gòu" },
  usefulWeighs: {
    fr: "pesées valides",
    en: "valid weigh-ins",
    zh: "有效称重",
    py: "yǒu xiào chēng zhòng",
  },
  history: { fr: "Historique", en: "History", zh: "记录", py: "jì lù" },
  noEntries: {
    fr: "Aucune pesée enregistrée. Ajoute 3 pesées au réveil cette semaine.",
    en: "No weigh-ins yet. Log 3 morning weigh-ins this week.",
    zh: "还没有体重记录。本周起床称 3 次。",
    py: "hái méi yǒu tǐ zhòng jì lù. běn zhōu qǐ chuáng chēng 3 cì.",
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
    fr: "Force + hypertrophie · 12 semaines",
    en: "Strength + hypertrophy · 12 weeks",
    zh: "力量 + 增肌 · 12 周",
    py: "lì liàng + zēng jī · 12 zhōu",
  },
  tTitle: {
    fr: "3 séances lourdes, une mobilité facultative. Jambes, dos, pecs — et de la force.",
    en: "3 heavy sessions, one optional mobility day. Legs, back, chest — and strength.",
    zh: "3 次力量课，1 次可选恢复。腿、背、胸，也练力量。",
    py: "3 cì lì liàng kè, 1 cì kě xuǎn huī fù. tuǐ, bèi, xiōng, yě liàn lì liàng.",
  },
  tLead: {
    fr: "Lundi A (jambes force), mercredi B (pecs/dos force), vendredi C (volume). Samedi ou dimanche : D mobilité. Un jour de repos entre les grosses séances. Semaines 4 et 8 : allège. Semaine 12 : taper.",
    en: "Monday A (legs, strength), Wednesday B (chest/back, strength), Friday C (volume). Saturday or Sunday: D mobility. Rest a day between heavy sessions. Weeks 4 and 8: deload. Week 12: taper.",
    zh: "周一 A（腿力量），周三 B（胸背力量），周五 C（容量）。周六或周日：D 活动。大课之间休息一天。第 4、8 周减载。第 12 周收量。",
    py: "zhōu yī A, zhōu sān B, zhōu wǔ C. zhōu liù huò zhōu rì D. dì 4, 8 zhōu jiǎn zài. dì 12 zhōu shōu liàng.",
  },
  loggedSessions: {
    fr: "Séances enregistrées",
    en: "Logged sessions",
    zh: "已记录的训练",
    py: "yǐ jì lù de xùn liàn",
  },
  done: { fr: "terminée", en: "done", zh: "已完成", py: "yǐ wán chéng" },
  open: { fr: "en cours", en: "open", zh: "进行中", py: "jìn xíng zhōng" },
  startHint: {
    fr: "Choisis A, B, C — ou D mobilité. Échauffement d’abord, avec les kg, puis les séries de travail.",
    en: "Pick A, B, C — or D mobility. Warm up first, with the kg ramps, then the working sets.",
    zh: "选 A、B、C，或恢复课 D。先热身（含公斤），再做正式组。",
    py: "xuǎn A, B, C, huò huī fù kè D. xiān rè shēn, zài zuò zhèng shì zǔ.",
  },
  warmupTitle: {
    fr: "Échauffement",
    en: "Warm-up",
    zh: "热身",
    py: "rè shēn",
  },
  warmupLead: {
    fr: "5–8 min de cardio léger et mobilité. Les séries de chauffe (kg × reps) sont sous chaque exo, juste avant le travail.",
    en: "5–8 min easy cardio and mobility. Load ramps (kg × reps) sit under each lift, right before the work sets.",
    zh: "5 到 8 分钟轻松有氧和活动。每个动作下面、正式组之前，有热身组（公斤 × 次数）。",
    py: "5 dào 8 fēn zhōng qīng sōng yǒu yǎng. měi gè dòng zuò xià miàn yǒu rè shēn zǔ.",
  },
  warmupRampTitle: {
    fr: "Chauffe — kg × reps",
    en: "Warm-up — kg × reps",
    zh: "热身 — 公斤 × 次数",
    py: "rè shēn — gōng jīn × cì shù",
  },
  warmupUnknown: {
    fr: "Chauffe : charge légère × 10, puis un cran au-dessus × 6–8. Note le kg de travail, les séries chiffrées s’affichent.",
    en: "Warm-up: light × 10, then one jump × 6–8. Log the working kg and the numbered ramps appear.",
    zh: "热身：轻重量 10 次，再加一档做 6 到 8 次。记下工作重量后，会显示具体热身组。",
    py: "rè shēn: qīng × 10, zài jiā yì dǎng × 6 dào 8. jì xià gōng zuò zhòng liàng.",
  },
  warmupRampCue: {
    fr: "Plusieurs reps en réserve. Repos 1–2 min. Puis séries de travail : 2–4 min.",
    en: "Leave several reps in reserve. Rest 1–2 min. Then working sets: 2–4 min.",
    zh: "多留几次余力。休息 1 到 2 分钟。正式组休息 2 到 4 分钟。",
    py: "duō liú jǐ cì yú lì. xiū xi 1 dào 2 fēn zhōng. zhèng shì zǔ 2 dào 4 fēn zhōng.",
  },
  warmupWork: {
    fr: "Séries de travail",
    en: "Working sets",
    zh: "正式组",
    py: "zhèng shì zǔ",
  },
  easy: { fr: "Facile", en: "Easy", zh: "轻松", py: "qīng sōng" },
  normal: { fr: "Normale", en: "Normal", zh: "正常", py: "zhèng cháng" },
  hard: { fr: "Dure", en: "Hard", zh: "吃力", py: "chī lì" },
  effortHint: {
    fr: "Après chaque série : facile, normale ou dure. Le coach s’aligne là-dessus. Holds : note les secondes, pas les kg.",
    en: "After each set: easy, normal, or hard. The coach follows that. Holds: log seconds, not kg.",
    zh: "每组结束后：轻松、正常或吃力。教练按这个调。支撑动作记秒数，不要记公斤。",
    py: "měi zǔ jié shù hòu: qīng sōng, zhèng cháng huò chī lì. zhī chēng jì miǎo, bú yào jì gōng jīn.",
  },
  planTitle: {
    fr: "Plan de cette séance",
    en: "Plan for this session",
    zh: "这次按这个做",
    py: "zhè cì àn zhè ge zuò",
  },
  carnetLead: {
    fr: "Ouvre une séance pour relire charges, effort et analyse.",
    en: "Open a session to reread loads, effort, and the review.",
    zh: "点开一次训练，查看重量、体感和分析。",
    py: "diǎn kāi yí cì xùn liàn, chá kàn zhòng liàng, tǐ gǎn hé fēn xī.",
  },
  carnetEmpty: {
    fr: "Aucune séance encore. Termine une séance pour remplir le carnet.",
    en: "No sessions yet. Finish a session to fill the log.",
    zh: "还没有训练记录。完成一次训练后会记在这里。",
    py: "hái méi yǒu xùn liàn. wán chéng yí cì jiù huì jì zài zhè lǐ.",
  },
  consultSession: { fr: "Consulter", en: "Open", zh: "查看", py: "chá kàn" },
  jumpCarnet: {
    fr: "Carnet",
    en: "Log",
    zh: "记录",
    py: "jì lù",
  },
  sessionsToday: {
    fr: "séance(s) aujourd’hui",
    en: "session(s) today",
    zh: "今天已练",
    py: "jīn tiān yǐ liàn",
  },
  restTimer: { fr: "Repos", en: "Rest", zh: "休息", py: "xiū xi" },
  skipRest: { fr: "Passer", en: "Skip", zh: "跳过", py: "tiào guò" },
  markDone: {
    fr: "Terminer et analyser",
    en: "Finish and review",
    zh: "结束并分析",
    py: "jié shù bìng fēn xī",
  },
  markDoneLight: {
    fr: "Terminer la mobilité",
    en: "Finish mobility",
    zh: "结束恢复课",
    py: "jié shù huī fù kè",
  },
  editSession: { fr: "Modifier", en: "Edit", zh: "修改", py: "xiū gǎi" },
  deleteSession: { fr: "Supprimer", en: "Delete", zh: "删除", py: "shān chú" },
  confirmDelete: {
    fr: "Confirmer",
    en: "Confirm",
    zh: "确认删除",
    py: "què rèn shān chú",
  },
  closeLog: { fr: "Fermer", en: "Close", zh: "收起", py: "shōu qǐ" },
  sessionDate: { fr: "Date", en: "Date", zh: "日期", py: "rì qī" },
  reopenSession: { fr: "Rouvrir", en: "Reopen", zh: "重新打开", py: "chóng xīn dǎ kāi" },
  debriefTitle: {
    fr: "Ajustements pour la prochaine séance",
    en: "Adjustments for next time",
    zh: "下次这样改",
    py: "xià cì zhè yàng gǎi",
  },
  analyzing: {
    fr: "Le coach lit tes séries…",
    en: "The coach is reading your sets…",
    zh: "教练正在看你的组数…",
    py: "jiào liàn zhèng zài kàn nǐ de zǔ shù",
  },
  analyzingLead: {
    fr: "Il lit kg, reps, secondes et Facile/Normale/Dure. Pas une grille automatique.",
    en: "It reads kg, reps, seconds, and Easy/Normal/Hard. Not a fixed grid.",
    zh: "它会看公斤、次数、秒数，以及轻松/正常/吃力。不是死板套公式。",
    py: "tā huì kàn gōng jīn, cì shù, miǎo shù, yǐ jí qīng sōng / zhèng cháng / chī lì.",
  },
  coachAi: { fr: "Coach IA", en: "AI coach", zh: "AI 教练", py: "AI jiào liàn" },
  coachLocal: {
    fr: "Règles de secours",
    en: "Fallback rules",
    zh: "备用规则",
    py: "bèi yòng guī zé",
  },
  seconds: { fr: "secondes", en: "seconds", zh: "秒", py: "miǎo" },
  addedKg: { fr: "lest kg", en: "added kg", zh: "负重公斤", py: "fù zhòng gōng jīn" },
  reps: { fr: "reps", en: "reps", zh: "次", py: "cì" },
  kindLoad: { fr: "kg × reps", en: "kg × reps", zh: "公斤 × 次数", py: "gōng jīn × cì shù" },
  kindBody: { fr: "poids de corps", en: "bodyweight", zh: "自重", py: "zì zhòng" },
  kindTimed: { fr: "hold / secondes", en: "hold / seconds", zh: "支撑 / 秒", py: "zhī chēng / miǎo" },
  alternative: { fr: "Alternative", en: "Swap", zh: "替换", py: "tì huàn" },
  prescribed: { fr: "Prescrit", en: "Programmed", zh: "原计划", py: "yuán jì huà" },
  altLead: {
    fr: "Si tu ne peux pas faire ce mouvement, ouvre une variante. Même slot, autre exo.",
    en: "If you cannot do this lift, open a swap. Same slot, different exercise.",
    zh: "做不了这个动作，就打开替换。位置不变，换成另一个。",
    py: "zuò bù liǎo zhè ge dòng zuò, jiù dǎ kāi tì huàn.",
  },
  gifCredit: {
    fr: "Démos : exercises-dataset · © Gym visual",
    en: "Demos: exercises-dataset · © Gym visual",
    zh: "动作演示：exercises-dataset · © Gym visual",
    py: "dòng zuò yǎn shì: exercises-dataset · © Gym visual",
  },
  reviewTimeout: {
    fr: "L’analyse a dépassé 40 s. Relance-la.",
    en: "The review took more than 40 s. Try again.",
    zh: "分析超过 40 秒。再试一次。",
    py: "fēn xī chāo guò 40 miǎo. zài shì yí cì.",
  },
  reviewAuth: {
    fr: "Session expirée. Reconnecte-toi, puis relance l’analyse.",
    en: "Session expired. Sign in again, then retry the review.",
    zh: "登录已过期。重新登录后再分析。",
    py: "dēng lù yǐ guò qī. chóng xīn dēng lù hòu zài fēn xī.",
  },
  reviewFail: {
    fr: "L’analyse n’a pas abouti. Relance-la.",
    en: "The review did not finish. Try again.",
    zh: "分析没有完成。再试一次。",
    py: "fēn xī méi yǒu wán chéng. zài shì yí cì.",
  },
  retryAnalysis: {
    fr: "Relancer l’analyse",
    en: "Run the review again",
    zh: "再分析一次",
    py: "zài fēn xī yí cì",
  },
  sets: { fr: "séries", en: "sets", zh: "组", py: "zǔ" },
  set: { fr: "série", en: "set", zh: "组", py: "zǔ" },
  upperA: { fr: "Upper A", en: "Upper A", zh: "上肢 A", py: "shàng zhī A" },
  lowerA: { fr: "Lower A", en: "Lower A", zh: "下肢 A", py: "xià zhī A" },
  upperB: { fr: "Upper B", en: "Upper B", zh: "上肢 B", py: "shàng zhī B" },
  lowerB: { fr: "Lower B", en: "Lower B", zh: "下肢 B", py: "xià zhī B" },
  sessionA: { fr: "Séance A", en: "Session A", zh: "课 A", py: "kè A" },
  sessionB: { fr: "Séance B", en: "Session B", zh: "课 B", py: "kè B" },
  sessionC: { fr: "Séance C", en: "Session C", zh: "课 C", py: "kè C" },
  sessionD: { fr: "Séance D", en: "Session D", zh: "课 D", py: "kè D" },
  cycleStart: {
    fr: "Démarre avec ~2 reps en réserve. Note chaque charge. Si le haut de fourchette est propre partout : +2,5 kg la fois suivante.",
    en: "Start with about 2 reps in reserve. Log every load. If you hit the top of the range clean on every set: add 2.5 kg next time.",
    zh: "先留大约 2 次余力。记下每个重量。如果每组都干净做到区间上限：下次加 2.5 公斤。",
    py: "xiān liú dàyuē 2 cì yú lì. jì xià měi gè zhòng liàng.",
  },
  cycleBuild: {
    fr: "Ajoute des reps ou un peu de poids, sans sacrifier la technique. Arrête la série si ça se dégrade.",
    en: "Add reps or a little weight, without losing technique. Stop a set if form breaks.",
    zh: "加次数或稍加重量，动作不能垮。动作变形就停。",
    py: "jiā cì shù huò shāo jiā zhòng liàng. dòng zuò biàn xíng jiù tíng.",
  },
  cycleDeload: {
    fr: "Semaine allégée : environ la moitié des séries, charges faciles. Récupère.",
    en: "Deload week: about half the sets, easy loads. Recover.",
    zh: "减载周：大约一半组数，重量轻松。好好恢复。",
    py: "jiǎn zài zhōu: dàyuē yí bàn zǔ shù, zhòng liàng qīng sōng.",
  },
  cycleTaper: {
    fr: "Volume réduit. Compare tes perfs au début du cycle — sans chercher un maximum.",
    en: "Lower volume. Compare to the start of the cycle — do not hunt a max.",
    zh: "减量。和周期开始比成绩——不要测最大重量。",
    py: "jiǎn liàng. hé zhōu qī kāi shǐ bǐ. bú yào cè zuì dà.",
  },
  ruleIntensityTitle: {
    fr: "Progression",
    en: "Progression",
    zh: "加重量",
    py: "jiā zhòng liàng",
  },
  ruleIntensityDetail: {
    fr: "Haut de fourchette sur toutes les séries, technique propre, encore 1–2 reps en réserve → +2,5 kg. Petits incréments, surtout bench et jambes. Principaux : repos 2–4 min. Assistance : 1–2 min.",
    en: "Top of the range on every set, clean form, 1–2 reps in reserve → +2.5 kg. Small jumps, especially on bench and legs. Main lifts: rest 2–4 min. Assistance: 1–2 min.",
    zh: "每组都到区间上限、动作干净、还留 1 到 2 次余力 → 加 2.5 公斤。卧推和腿尤其小步加。主项休息 2 到 4 分钟，辅助 1 到 2 分钟。",
    py: "měi zǔ dào shàng xiàn, dòng zuò gān jìng, hái liú 1 dào 2 cì → jiā 2.5 gōng jīn.",
  },
  ruleBackTitle: {
    fr: "12 semaines",
    en: "12 weeks",
    zh: "12 周",
    py: "12 zhōu",
  },
  ruleBackDetail: {
    fr: "Semaines 1–3 : ~2 RIR. 4 : allège (~½ séries). 5–7 : remonte. 8 : allège. 9–11 : progresse. 12 : moins de volume, pas de max.",
    en: "Weeks 1–3: ~2 RIR. 4: deload (~½ sets). 5–7: build. 8: deload. 9–11: progress. 12: less volume, no max.",
    zh: "1 到 3 周：约 2 次余力。第 4 周减载（约一半组）。5 到 7 周再上。第 8 周减载。9 到 11 周继续加。第 12 周减量，不测最大。",
    py: "1 dào 3 zhōu liú 2 cì yú lì. dì 4, 8 zhōu jiǎn zài. dì 12 zhōu bú yào cè zuì dà.",
  },
  ruleAbsTitle: {
    fr: "Charges de départ",
    en: "Starting loads",
    zh: "起始重量",
    py: "qǐ shǐ zhòng liàng",
  },
  ruleAbsDetail: {
    fr: "Squat 65 kg (pas 90). RDL 45–50 kg (pas le max 80). Bench 55 kg (70 × 4–5 n’est pas une charge de 4×4–6). Incliné : 17,5–20 kg si 22,5 est limite. Rowing 50 kg si le dos reste stable. Leg curl : teste 40–45 kg.",
    en: "Squat 65 kg (not 90). RDL 45–50 kg (not the 80 kg deadlift max). Bench 55 kg (70 × 4–5 is not a 4×4–6 working load). Incline: 17.5–20 kg if 22.5 is a grind. Row 50 kg if the back stays stable. Leg curl: try 40–45 kg.",
    zh: "深蹲 65 公斤（不是 90）。罗马尼亚硬拉 45 到 50（不是硬拉最大 80）。卧推 55（70 公斤做 4 到 5 次不是 4×4–6 的工作重量）。上斜：22.5 吃力就用 17.5 到 20。划船 50 前提是背稳定。腿弯举先试 40 到 45。",
    py: "shēn dūn 65. RDL 45 dào 50. wò tuī 55. shàng xié 17.5 dào 20. huá chuán 50. tuǐ wān jǔ 40 dào 45.",
  },
  ruleNeckTitle: {
    fr: "Poids sur la balance",
    en: "Scale weight",
    zh: "体重",
    py: "tǐ zhòng",
  },
  ruleNeckDetail: {
    fr: "Moyenne du matin, 10–14 jours. Si ça ne monte pas : +200–300 kcal, réévalue après 2 semaines. Vise 130–165 g de protéines. 7–9 h de sommeil.",
    en: "Morning average over 10–14 days. If it is not rising: +200–300 kcal, reassess after 2 weeks. Aim for 130–165 g protein. Sleep 7–9 h.",
    zh: "连续 10 到 14 天看早晨均重。不涨就每天多 200 到 300 千卡，两周后再看。蛋白质 130 到 165 克。睡 7 到 9 小时。",
    py: "kàn zǎo chen jūn zhòng. bù zhǎng jiù duō 200 dào 300 qiān kǎ. dàn bái zhì 130 dào 165 kè.",
  },

  cKicker: {
    fr: "Coach musculation",
    en: "Lifting coach",
    zh: "力量训练教练",
    py: "lì liàng xùn liàn jiào liàn",
  },
  cTitle: {
    fr: "Demande la séance du jour, ou la consigne d’un mouvement.",
    en: "Ask for today’s session, or the cue for a lift.",
    zh: "问今天练什么，或问动作要点。",
    py: "wèn jīn tiān liàn shén me, huò wèn dòng zuò yào diǎn.",
  },
  cLead: {
    fr: "Le coach suit le cycle 12 semaines A/B/C + D, l’objectif 83 → 90 kg, et 130–165 g de protéines.",
    en: "The coach follows the 12-week A/B/C + D cycle, the 83 → 90 kg target, and 130–165 g of protein.",
    zh: "教练按 12 周 A/B/C + D 来排，也知道 83 到 90 公斤、蛋白质 130 到 165 克。",
    py: "jiào liàn àn 12 zhōu A/B/C + D lái pái.",
  },
  generated: {
    fr: "Séance générée",
    en: "Generated session",
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
    fr: "Générer la séance du jour",
    en: "Generate today’s session",
    zh: "生成今天的训练",
    py: "shēng chéng jīn tiān de xùn liàn",
  },
  coachError: {
    fr: "Le coach n’a pas répondu.",
    en: "The coach did not reply.",
    zh: "教练没有回复。",
    py: "jiào liàn méi yǒu huí fù.",
  },
  emptyStream: { fr: "Réponse vide.", en: "Empty reply.", zh: "回复是空的。", py: "huí fù shì kōng de." },
  coachFail: { fr: "Erreur coach", en: "Coach error", zh: "教练出错", py: "jiào liàn chū cuò" },
  placeholder: {
    fr: "Ex. Consigne pour un développé couché, 1–3 reps en réserve.",
    en: "Ex. Cue for a bench press, leaving 1–3 reps in reserve.",
    zh: "例如：杠铃卧推怎么做，每组留 1 到 3 次余力。",
    py: "lì rú: gàng líng wò tuī zěn me zuò, měi zǔ liú 1 dào 3 cì yú lì.",
  },
  sessionReady: {
    fr: "Séance prête",
    en: "Session ready",
    zh: "训练已准备好",
    py: "xùn liàn yǐ zhǔn bèi hǎo",
  },
  starter1: {
    fr: "Donne-moi la séance Upper/Lower prévue aujourd’hui, 60–75 min, séries et repos.",
    en: "Give me today’s planned Upper/Lower session, 60–75 min, with sets and rest.",
    zh: "给我今天该练的上肢/下肢课，60 到 75 分钟，带组数和休息。",
    py: "gěi wǒ jīn tiān gāi liàn de shàng zhī / xià zhī kè, 60 dào 75 fēn zhōng, dài zǔ shù hé xiū xi.",
  },
  starter2: {
    fr: "Consigne pour un squat : placement, profondeur, 1–3 reps en réserve.",
    en: "Cue for a squat: stance, depth, leave 1–3 reps in reserve.",
    zh: "深蹲要点：站距、深度、每组留 1 到 3 次余力。",
    py: "shēn dūn yào diǎn: zhàn jù, shēn dù, měi zǔ liú 1 dào 3 cì yú lì.",
  },
  starter3: {
    fr: "Salle limitée : haltères et barre. Quelle variante pour Upper A ?",
    en: "Limited gym: dumbbells and a bar. What is the Upper A substitute?",
    zh: "器材有限：只有哑铃和杠铃。上肢 A 怎么替换？",
    py: "qì cái yǒu xiàn: zhǐ yǒu yǎ líng hé gàng líng. shàng zhī A zěn me tì huàn?",
  },
  starter4: {
    fr: "Séance tirage. Genou un peu sensible : pas de fentes ni de split squat.",
    en: "A pull session. Knee is a bit sore: no lunges or split squats.",
    zh: "拉的训练。膝盖有点不舒服：不要弓步和分腿蹲。",
    py: "lā de xùn liàn. xī gài yǒu diǎn bù shū fu: bú yào gōng bù hé fēn tuǐ dūn.",
  },
  generatePrompt: {
    fr: "Donne-moi la séance Upper/Lower prévue aujourd’hui, avec séries, repos et 1–3 reps en réserve.",
    en: "Give me today’s planned Upper/Lower session, with sets, rest, and 1–3 reps in reserve.",
    zh: "给我今天该练的上肢/下肢课，带组数、休息，每组留 1 到 3 次余力。",
    py: "gěi wǒ jīn tiān gāi liàn de shàng zhī / xià zhī kè, dài zǔ shù, xiū xi, měi zǔ liú 1 dào 3 cì yú lì.",
  },

  plateauWarmTitle: {
    fr: "Pas encore assez de pesées",
    en: "Not enough weigh-ins yet",
    zh: "称重次数还不够",
    py: "chēng zhòng cì shù hái bù gòu",
  },
  plateauWarmDetail: {
    fr: "Pèse-toi 3 fois cette semaine, au réveil, à jeun. La moyenne part de là. Trop tôt pour juger la prise de poids.",
    en: "Weigh in 3 times this week, after waking, fasted. The average starts there. Too early to judge the gain.",
    zh: "本周起床空腹称 3 次。平均值从这里开始。现在判断增重还太早。",
    py: "běn zhōu qǐ chuáng kōng fù chēng 3 cì. píng jūn zhí cóng zhè lǐ kāi shǐ. xiàn zài pàn duàn zēng zhòng hái tài zǎo.",
  },
  plateauUpDetail: {
    fr: "Le surplus fonctionne. Garde le même rythme alimentaire et les mêmes 4 séances.",
    en: "The surplus is working. Keep the same eating pattern and the same 4 sessions.",
    zh: "热量盈余有效。饮食节奏和每周 4 练先不要改。",
    py: "rè liàng yíng yú yǒu xiào. yǐn shí jié zòu hé měi zhōu 4 liàn xiān bú yào gǎi.",
  },
  plateauStuckTitle: {
    fr: "Le poids stagne depuis 2 semaines",
    en: "Weight has stalled for 2 weeks",
    zh: "体重已经两周没涨",
    py: "tǐ zhòng yǐ jīng liǎng zhōu méi zhǎng",
  },
  plateauStuckDetail: {
    fr: "Ajoute 150–200 kcal par jour : 30 g de cacahuètes, 250 ml de lait, une portion de riz, ou 1 cuillère de beurre de cacahuète. Coche un ajout, pas les quatre.",
    en: "Add 150–200 kcal a day: 30 g peanuts, 250 ml milk, one extra serving of rice, or 1 spoon of peanut butter. Check one extra, not all four.",
    zh: "每天再加 150 到 200 千卡：30 克花生、250 毫升牛奶、多一碗米饭，或 1 勺花生酱。只多勾一项，不要四项全加。",
    py: "měi tiān zài jiā 150 dào 200 qiān kǎ: 30 kè huā shēng, 250 háo shēng niú nǎi, duō yì wǎn mǐ fàn, huò 1 sháo huā shēng jiàng. zhǐ duō gōu yí xiàng, bú yào sì xiàng quán jiā.",
  },
  plateauFlatTitle: {
    fr: "Pas de hausse nette cette semaine",
    en: "No clear gain this week",
    zh: "这周体重没有明显增加",
    py: "zhè zhōu tǐ zhòng méi yǒu míng xiǎn zēng jiā",
  },
  plateauFlatDetail: {
    fr: "Attends encore 2–3 pesées. Si la moyenne ne monte pas la semaine prochaine, ajoute 150–200 kcal par jour.",
    en: "Wait for 2–3 more weigh-ins. If the average still does not rise next week, add 150–200 kcal a day.",
    zh: "先再称 2 到 3 次。如果下周平均值还不涨，每天再加 150 到 200 千卡。",
    py: "xiān zài chēng 2 dào 3 cì. rú guǒ xià zhōu píng jūn zhí hái bù zhǎng, měi tiān zài jiā 150 dào 200 qiān kǎ.",
  },

  dayMon: { fr: "Lundi", en: "Monday", zh: "周一", py: "zhōu yī" },
  dayTue: { fr: "Mardi", en: "Tuesday", zh: "周二", py: "zhōu èr" },
  dayWed: { fr: "Mercredi", en: "Wednesday", zh: "周三", py: "zhōu sān" },
  dayThu: { fr: "Jeudi", en: "Thursday", zh: "周四", py: "zhōu sì" },
  dayFri: { fr: "Vendredi", en: "Friday", zh: "周五", py: "zhōu wǔ" },
  daySat: { fr: "Samedi", en: "Saturday", zh: "周六", py: "zhōu liù" },
  daySun: { fr: "Dimanche", en: "Sunday", zh: "周日", py: "zhōu rì" },
  noteWalk: {
    fr: "Marche 20–40 min, mobilité, respecter les calories.",
    en: "Walk 20–40 min, mobility, hit the calorie target.",
    zh: "散步 20 到 40 分钟、活动关节、把热量吃够。",
    py: "sàn bù 20 dào 40 fēn zhōng, huó dòng guān jié, bǎ rè liàng chī gòu.",
  },
  noteRestBack: {
    fr: "Marche 20–40 min, mobilité légère. Pas de charge lombaire intense.",
    en: "Walk 20–40 min, light mobility. No hard lower-back loading.",
    zh: "散步 20 到 40 分钟，轻度活动。不要狠练腰。",
    py: "sàn bù 20 dào 40 fēn zhōng, qīng dù huó dòng. bú yào hěn liàn yāo.",
  },
  noteRestSmoothie: {
    fr: "Repos. Si l’appétit baisse, prends le smoothie du soir (600–800 kcal).",
    en: "Rest. If appetite is low, take the evening smoothie (600–800 kcal).",
    zh: "休息。胃口不好就喝晚上的奶昔（600 到 800 千卡）。",
    py: "xiū xi. wèi kǒu bù hǎo jiù hē wǎn shang de nǎi xī (600 dào 800 qiān kǎ).",
  },
  noteOptional: {
    fr: "Facultatif · mobilité 20–30 min. Te laisser plus frais, pas t’épuiser.",
    en: "Optional · 20–30 min mobility. Leave you fresher, not drained.",
    zh: "可选 · 活动 20 到 30 分钟。应该更轻松，不要累。",
    py: "kě xuǎn · huó dòng 20 dào 30 fēn zhōng. bú yào lèi.",
  },
  noteRest: {
    fr: "Repos complet. Priorité sommeil et calories.",
    en: "Full rest. Priority: sleep and calories.",
    zh: "完全休息。优先睡觉和把热量吃够。",
    py: "wán quán xiū xi. yōu xiān shuì jiào hé bǎ rè liàng chī gòu.",
  },

  mealBreakfast: { fr: "Petit-déjeuner", en: "Breakfast", zh: "早餐", py: "zǎo cān" },
  mealLunch: { fr: "Déjeuner", en: "Lunch", zh: "午餐", py: "wǔ cān" },
  mealSnack: { fr: "Collation", en: "Snack", zh: "加餐", py: "jiā cān" },
  mealDinner: { fr: "Dîner", en: "Dinner", zh: "晚餐", py: "wǎn cān" },
  mealNight: { fr: "Avant de dormir", en: "Before bed", zh: "睡前", py: "shuì qián" },
  hintBreakfast: {
    fr: "Objectif : un vrai repas le matin. 3 œufs + pain ou mantou + 500 ml de lait. Ne force pas le volume au-delà.",
    en: "Target: a full breakfast. 3 eggs + bread or mantou + 500 ml milk. Do not force extra volume beyond that.",
    zh: "目标：早上吃够。3 个鸡蛋 + 馒头或面包 + 500 毫升牛奶。不必再硬加份量。",
    py: "mù biāo: zǎo shang chī gòu. 3 gè jī dàn + mán tou huò miàn bāo + 500 háo shēng niú nǎi. bú bì zài yìng jiā fèn liàng.",
  },
  hintLunch: {
    fr: "Objectif : le repas le plus facile à charger. 1,5–2 bols de riz + 150–200 g de viande + tofu.",
    en: "Target: the easiest meal to load. 1.5–2 bowls of rice + 150–200 g meat + tofu.",
    zh: "目标：最容易加量的一餐。米饭 1.5 到 2 碗 + 肉 150 到 200 克 + 豆腐。",
    py: "mù biāo: zuì róng yì jiā liàng de yì cān. mǐ fàn 1.5 dào 2 wǎn + ròu 150 dào 200 kè + dòu fu.",
  },
  hintSnack: {
    fr: "Objectif : calories denses, petit volume. 30–40 g de noix + yaourt entier + 1 fruit.",
    en: "Target: dense calories, small volume. 30–40 g nuts + whole yogurt + 1 fruit.",
    zh: "目标：热量高、体积小。坚果 30 到 40 克 + 全脂酸奶 + 1 个水果。",
    py: "mù biāo: rè liàng gāo, tǐ jī xiǎo. jiān guǒ 30 dào 40 kè + quán zhī suān nǎi + 1 gè shuǐ guǒ.",
  },
  hintDinner: {
    fr: "Objectif : glucides + une vraie source de protéines. Nouilles ou riz, plus poisson, poulet ou tofu. Ajoute 2 œufs si la protéine manque.",
    en: "Target: carbs plus a real protein source. Noodles or rice, plus fish, chicken, or tofu. Add 2 eggs if protein is low.",
    zh: "目标：主食加一份真正的蛋白质。面条或米饭，再加鱼、鸡肉或豆腐。蛋白质不够再加 2 个鸡蛋。",
    py: "mù biāo: zhǔ shí jiā yí fèn zhēn zhèng de dàn bái zhì. miàn tiáo huò mǐ fàn, zài jiā yú, jī ròu huò dòu fu. dàn bái zhì bù gòu zài jiā 2 gè jī dàn.",
  },
  hintNight: {
    fr: "Objectif : 600–800 kcal sans un gros repas à mâcher. Lait + avoine + banane + beurre de cacahuète.",
    en: "Target: 600–800 kcal without a large meal to chew. Milk + oats + banana + peanut butter.",
    zh: "目标：大约 600 到 800 千卡，不用再嚼一大餐。牛奶 + 燕麦 + 香蕉 + 花生酱。",
    py: "mù biāo: dà yuē 600 dào 800 qiān kǎ, bú yòng zài jiáo yí dà cān. niú nǎi + yàn mài + xiāng jiāo + huā shēng jiàng.",
  },

  rice: { fr: "Riz 米饭", en: "Rice 米饭", zh: "米饭", py: "mǐ fàn" },
  riceUse: {
    fr: "+1 bol au déjeuner et au dîner",
    en: "+1 bowl at lunch and dinner",
    zh: "午饭和晚饭各多加一碗",
    py: "wǔ fàn hé wǎn fàn gè duō jiā yì wǎn",
  },
  oats: { fr: "Avoine 燕麦", en: "Oats 燕麦", zh: "燕麦", py: "yàn mài" },
  oatsUse: {
    fr: "60–80 g dans le smoothie du soir, ou avec du lait",
    en: "60–80 g in the evening smoothie, or with milk",
    zh: "晚上奶昔加 60 到 80 克，或配牛奶",
    py: "wǎn shang nǎi xī jiā 60 dào 80 kè, huò pèi niú nǎi",
  },
  nutsFood: {
    fr: "Cacahuètes / noix",
    en: "Peanuts / nuts",
    zh: "花生 / 坚果",
    py: "huā shēng / jiān guǒ",
  },
  nutsUse: {
    fr: "Collation 30–50 g, non sucrées, peu salées",
    en: "30–50 g snack, unsweetened, lightly salted",
    zh: "加餐 30 到 50 克，不要甜的，少盐",
    py: "jiā cān 30 dào 50 kè, bú yào tián de, shǎo yán",
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
    fr: `1,92 m · IMC ${bmi} · cycle 12 semaines · coach IA après chaque séance.`,
    en: `1.92 m · BMI ${bmi} · 12-week cycle · AI coach after every session.`,
    zh: `身高 1.92 米 · BMI ${bmi} · 12 周训练 · 每次训练后有 AI 教练。`,
    py: `shēn gāo 1.92 mǐ · BMI ${bmi} · 12 zhōu xùn liàn · měi cì xùn liàn hòu yǒu AI jiào liàn.`,
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

export function pathLabel(locale: Locale, current: number, target: number, pct: string) {
  const from = current.toFixed(1);
  return t(locale, {
    fr: `${from} kg → ${target} kg · ${pct} % du chemin`,
    en: `${from} kg → ${target} kg · ${pct}% of the way`,
    zh: `${from} 公斤 → ${target} 公斤 · 已完成 ${pct}%`,
    py: `${from} gōng jīn → ${target} gōng jīn · yǐ wán chéng ${pct}%`,
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
