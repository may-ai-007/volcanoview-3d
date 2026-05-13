// 火山知识数据 - 根据需求文档整理

export const STAGES = [
  {
    id: 'before',
    name: '喷发前',
    description: '火山喷发前，地下会先忙起来',
    icon: '🌋',
    color: '#f59e0b',
    subItems: [
      { id: 'crater', name: '火山口' },
      { id: 'magma-chamber', name: '岩浆库' },
      { id: 'conduit', name: '岩浆通道' },
    ],
  },
  {
    id: 'during',
    name: '喷发中',
    description: '喷出来的不只有熔岩',
    icon: '🔥',
    color: '#ef4444',
    subItems: [
      { id: 'ash-cloud', name: '火山灰云' },
      { id: 'lava-flow', name: '熔岩流' },
      { id: 'volcanic-gas', name: '火山气体' },
    ],
  },
  {
    id: 'after',
    name: '喷发后',
    description: '火山会重新改变地面',
    icon: '🏔️',
    color: '#6b7280',
    subItems: [
      { id: 'cooling-rock', name: '冷却岩层' },
      { id: 'new-landscape', name: '新地貌' },
    ],
  },
  {
    id: 'extension',
    name: '扩展知识',
    description: '火山有危险，也有可能带来好处',
    icon: '📚',
    color: '#8b5cf6',
    subItems: [
      { id: 'dangers', name: '火山危险' },
      { id: 'benefits', name: '火山益处' },
    ],
  },
];

export const KNOWLEDGE_CARDS = {
  'volcano-intro': {
    title: '火山像地球会呼吸的"烟囱"',
    description: '火山是地球表面的开口，地下很热的物质会从这里出来。地球上大约有1500座活火山，其中大部分分布在板块交界处。',
    childFriendly: '像锅里的热汤找到出口，会往外冒。地球内部超级热，岩浆就像被加热到1000多度的石头汤！',
    image: 'volcano-calm',
  },
  'magma': {
    title: '岩浆是藏在地下的热岩石',
    description: '岩浆是地下高温下熔化或半熔化的岩石物质，温度可达700°C到1300°C。喷到地面后通常叫熔岩。',
    childFriendly: '它像很热很热、会流动的石头糖浆。如果你不小心碰到，比碰到刚出炉的烤箱还要烫好多倍！',
    image: 'magma-chamber',
  },
  'before-eruption': {
    title: '火山喷发前，地下会先忙起来',
    description: '岩浆向上移动时，常会带来喷发前征兆：地面轻微震动、温泉温度升高、动物行为异常、火山口冒出更多气体。',
    childFriendly: '火山先在地下"憋力气"，就像你深呼吸准备大喊一样，身体会先有一些小动作。',
    image: 'volcano-calm',
  },
  'during-eruption': {
    title: '喷出来的不只有熔岩',
    description: '火山喷发会释放熔岩、火山灰、碎石和火山气体，常见气体包括水蒸气、二氧化碳和二氧化硫。火山灰云可以升到10公里以上的高空。',
    childFriendly: '像一瓶摇晃过的汽水，不只是液体冲出来，里面的气也会冲出来，还带着好多小泡泡！',
    image: 'volcano-erupting',
  },
  'ash-cloud': {
    title: '火山灰云：天空中的灰黑色巨柱',
    description: '火山灰由细小的岩石碎片和玻璃颗粒组成，喷发时可形成巨大的灰黑色云柱。火山灰会影响航空安全，也会影响气候。',
    childFriendly: '想象一下，把一整座山磨成面粉，然后吹到天上去——那就是火山灰云！飞机遇到它可要绕道走。',
    image: 'volcanic-ash-cloud',
  },
  'lava-types': {
    title: '熔岩有两种"性格"',
    description: '玄武岩熔岩流动性好，温度高，流速快；安山岩/流纹岩熔岩黏稠，温度低，容易堵塞火山口导致爆炸式喷发。',
    childFriendly: '有的熔岩像水一样跑得飞快，有的像蜂蜜一样慢慢爬。夏威夷的熔岩就是跑得快的那种！',
    image: 'lava-flow',
  },
  'after-eruption': {
    title: '火山会重新改变地面',
    description: '喷出的物质会堆积、冷却并改变地表，反复喷发会逐渐塑造火山的形状。冷却后的熔岩形成玄武岩，火山灰形成肥沃的土壤。',
    childFriendly: '火山一边破坏，一边也会重新"造地"。就像搭积木，拆了再搭，每次形状都不一样！',
    image: 'volcano-after',
  },
  'volcano-types': {
    title: '火山有三种主要形状',
    description: '盾状火山（如夏威夷莫纳罗亚）坡度平缓；层状火山（如富士山）呈锥形；火山渣锥体型较小，坡度陡峭。',
    childFriendly: '有的火山像一个大盾牌，有的像三角形蛋糕，还有的像一个小土丘——它们都是火山家族的成员！',
    image: 'volcano-calm',
  },
  'dangers': {
    title: '火山很壮观，也很危险',
    description: '火山灰、熔岩流、火山泥流和有毒气体都可能危害人类和环境。公元79年维苏威火山喷发摧毁了庞贝古城。',
    childFriendly: '好看不代表安全，太靠近会很危险。科学家们会像天气预报一样，提前告诉大家什么时候需要远离火山。',
    image: 'volcano-erupting',
  },
  'benefits': {
    title: '火山也会带来礼物',
    description: '火山活动可能形成新地表和岛屿（如夏威夷），把矿物质带到地表，地热能可以发电，火山灰让土壤更肥沃。',
    childFriendly: '火山像一位脾气很大的地球建筑师，虽然偶尔发脾气，但它也建造了美丽的岛屿和肥沃的农田。',
    image: 'volcano-benefits',
  },
  'volcano-monitoring': {
    title: '科学家如何"监视"火山',
    description: '科学家使用地震仪监测震动、卫星监测地面形变、气体分析仪检测排放物变化，来预测火山活动。',
    childFriendly: '科学家给火山装了很多"听诊器"和"温度计"，随时观察它是不是在"发脾气"。',
    image: 'volcano-calm',
  },
  'ring-of-fire': {
    title: '环太平洋火山带',
    description: '全球约75%的活火山分布在环太平洋火山带，这是一条围绕太平洋的弧形地带，从南美洲一直延伸到新西兰。',
    childFriendly: '想象在太平洋周围画一个大圆圈，这个圈上有好多好多火山，所以叫"火环"！',
    image: 'volcano-erupting',
  },
};

export const HOTSPOTS = [
  {
    id: 'crater',
    name: '火山口',
    description: '火山顶部的开口，是喷发物冲出地面的出口。',
    stage: ['before', 'during'],
    position: { x: 50, y: 15 },
    image: 'volcano-calm',
  },
  {
    id: 'magma-chamber',
    name: '岩浆库',
    description: '地下储存岩浆的地方，像一个巨大的热池子。',
    stage: ['before'],
    position: { x: 50, y: 75 },
    crossSectionOnly: true,
    image: 'magma-chamber',
  },
  {
    id: 'conduit',
    name: '岩浆通道',
    description: '岩浆从地下上升到地面的通道，像火山的"喉咙"。',
    stage: ['before', 'during'],
    position: { x: 50, y: 50 },
    crossSectionOnly: true,
    image: 'volcano-cross-section',
  },
  {
    id: 'ash-cloud',
    name: '火山灰云',
    description: '喷发时升入高空的灰黑色云柱，由细小的火山灰和气体组成。',
    stage: ['during'],
    position: { x: 50, y: 5 },
    image: 'volcanic-ash-cloud',
  },
  {
    id: 'lava-flow',
    name: '熔岩流',
    description: '从火山口流出的炽热熔岩，沿着山坡缓缓流动。',
    stage: ['during', 'after'],
    position: { x: 35, y: 55 },
    image: 'lava-flow',
  },
  {
    id: 'cooling-rock',
    name: '冷却岩层',
    description: '熔岩冷却后形成的坚硬岩石层，会改变周围的地貌。',
    stage: ['after'],
    position: { x: 40, y: 60 },
    image: 'volcano-after',
  },
];

export const STAGE_CONTENT = {
  before: {
    title: '喷发前',
    subtitle: '地下正在"憋力气"',
    mainText: '火山喷发前，地下的岩浆会慢慢积聚，压力也在不断上升。这时候，火山可能会发出一些"信号"：地面轻微震动、周围温度升高、有时还会冒出一些气体。',
    funFact: '你知道吗？科学家可以通过监测这些信号，提前知道火山可能要喷发！',
    image: 'volcano-calm',
    crossSectionImage: 'volcano-cross-section',
    knowledgeCards: ['volcano-intro', 'magma', 'before-eruption', 'volcano-types'],
  },
  during: {
    title: '喷发中',
    subtitle: '壮观的火山喷发',
    mainText: '当压力足够大时，火山就会喷发！喷出来的不只是红色的熔岩，还有火山灰、碎石和各种气体。灰黑色的烟柱可以冲上几千米的高空！',
    funFact: '你知道吗？火山喷发时，灰柱可以冲到比飞机飞得还高的地方！',
    image: 'volcano-erupting',
    knowledgeCards: ['during-eruption', 'ash-cloud', 'lava-types'],
  },
  after: {
    title: '喷发后',
    subtitle: '大地重新塑造',
    mainText: '喷发结束后，熔岩会慢慢冷却变硬，形成新的岩石层。火山灰会慢慢沉降，让周围的土壤变得更加肥沃。火山就像一位地球建筑师，不断改变着地表的样子。',
    funFact: '你知道吗？有些火山岛就是由无数次喷发堆积形成的！',
    image: 'volcano-after',
    knowledgeCards: ['after-eruption'],
  },
  extension: {
    title: '扩展知识',
    subtitle: '危险与益处',
    mainText: '火山既危险又有益处。危险的是喷发可能伤害人类和环境；益处是火山能形成新土地，带来肥沃的土壤和珍贵的矿物质。',
    funFact: '你知道吗？日本富士山、夏威夷群岛都是火山形成的！',
    image: 'volcano-benefits',
    knowledgeCards: ['dangers', 'benefits', 'volcano-monitoring', 'ring-of-fire'],
  },
};

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: '火山喷发前，地下最可能发生什么变化？',
    options: [
      { id: 'A', text: '岩浆慢慢积聚，压力上升', correct: true },
      { id: 'B', text: '地下河水开始结冰', correct: false },
      { id: 'C', text: '大树在地下快速生长', correct: false },
      { id: 'D', text: '地下的石头全部变成钻石', correct: false },
    ],
    explanation: '喷发前，岩浆会在地下慢慢积聚，压力逐渐上升，火山可能会发出震动、冒气等"信号"。',
  },
  {
    id: 2,
    question: '火山喷发时，除了熔岩还会喷出什么？',
    options: [
      { id: 'A', text: '只有红色的熔岩', correct: false },
      { id: 'B', text: '火山灰、碎石和各种气体', correct: true },
      { id: 'C', text: '大量的地下河水', correct: false },
      { id: 'D', text: '只冒白烟，没有别的东西', correct: false },
    ],
    explanation: '火山喷发会释放熔岩、火山灰、碎石和火山气体（如水蒸气、二氧化碳、二氧化硫）等多种物质。',
  },
  {
    id: 3,
    question: '火山喷发后，熔岩最终会变成什么？',
    options: [
      { id: 'A', text: '一直保持发光发热', correct: false },
      { id: 'B', text: '慢慢冷却，变成坚硬的岩石', correct: true },
      { id: 'C', text: '变成一滩水', correct: false },
      { id: 'D', text: '直接消失不见了', correct: false },
    ],
    explanation: '熔岩喷出后会慢慢冷却变硬，最终变成坚硬的岩石层，改变周围的地貌。',
  },
  {
    id: 4,
    question: '以下哪个是火山带来的好处？',
    options: [
      { id: 'A', text: '让天气永远不下雨', correct: false },
      { id: 'B', text: '带来肥沃的土壤和新土地', correct: true },
      { id: 'C', text: '让海水变成淡水', correct: false },
      { id: 'D', text: '完全没有任何好处', correct: false },
    ],
    explanation: '火山活动可以形成新地表，带来矿物质，让周围的土壤变得更加肥沃，适合种植。',
  },
  {
    id: 5,
    question: '科学家是怎么预测火山可能要喷发的？',
    options: [
      { id: 'A', text: '靠观察天上的星星', correct: false },
      { id: 'B', text: '靠掷骰子猜', correct: false },
      { id: 'C', text: '通过监测地面震动和气体变化', correct: true },
      { id: 'D', text: '没有办法预测', correct: false },
    ],
    explanation: '科学家通过地震仪、气体检测仪等设备，监测火山的震动频率、温度和气体排放等变化来预警。',
  },
  {
    id: 6,
    question: '世界上哪个著名的山是一座火山？',
    options: [
      { id: 'A', text: '珠穆朗玛峰', correct: false },
      { id: 'B', text: '日本富士山', correct: true },
      { id: 'C', text: '泰山', correct: false },
      { id: 'D', text: '黄山', correct: false },
    ],
    explanation: '日本富士山是一座著名的活火山，最近一次喷发在1707年。夏威夷群岛也是由火山喷发形成的！',
  },
];

// 图片路径映射
export const IMAGE_MAP = {
  'volcano-calm': '/assets/volcano-calm.jpg',
  'volcano-erupting': '/assets/volcano-erupting.jpg',
  'volcano-after': '/assets/volcano-after.jpg',
  'volcano-cross-section': '/assets/volcano-cross-section.jpg',
  'magma-chamber': '/assets/magma-chamber.jpg',
  'volcanic-ash-cloud': '/assets/volcanic-ash-cloud.jpg',
  'lava-flow': '/assets/lava-flow.jpg',
  'volcano-benefits': '/assets/volcano-benefits.jpg',
};

// 阶段顺序
export const STAGE_ORDER = ['before', 'during', 'after', 'extension'];
