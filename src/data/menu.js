export const MENU = {
  burgers: [
    {
      name: "Méga Burger 180",
      price: "13,90 €",
      desc: "Notre signature. Double smash 180g, double cheddar fondu, bacon de bœuf, sauce maison, oignons caramélisés, pain brioché toasté.",
      tag: "Signature",
    },
    {
      name: "Smash Crousty",
      price: "9,90 €",
      desc: "Steak smashé 120g, cheddar, oignons grillés, cornichons, sauce Crousty, pain brioché.",
    },
    {
      name: "Big New York",
      price: "11,90 €",
      desc: "Double steak, double cheddar, salade, tomate, oignon rouge, sauce burger maison.",
    },
    {
      name: "Chicken Crousty",
      price: "10,50 €",
      desc: "Tenders de poulet panés maison, cheddar, salade, sauce algérienne.",
    },
    {
      name: "Gourmet Truffe",
      price: "13,50 €",
      desc: "Steak 150g, brie fondu, oignons caramélisés, sauce truffe maison.",
      tag: "Édition",
    },
  ],
  tacos: [
    {
      name: "Tacos L · 1 viande",
      price: "8,50 €",
      desc: "Une viande au choix, frites maison, sauce fromagère gratinée, sauce au choix. Servi pressé.",
    },
    {
      name: "Tacos XL · 2 viandes",
      price: "10,50 €",
      desc: "Double viande, frites, sauce fromagère, double sauce. Le format préféré du quartier.",
      tag: "Best",
    },
    {
      name: "Tacos XXL · 3 viandes",
      price: "12,50 €",
      desc: "Triple viande, frites, sauce fromagère gratinée, triple sauce. Pour les gros appétits.",
    },
    {
      name: "Mégalo Crousty · 4 viandes",
      price: "15,90 €",
      desc: "Quatre viandes, frites maison, sauce fromagère gratinée, sauce signature.",
    },
  ],
  gratines: [
    {
      name: "Sandwich Gratiné",
      price: "9,50 €",
      desc: "Pain traditionnel, viande au choix, mélange emmental & mozzarella, passé au four. Servi avec frites.",
    },
    {
      name: "Mix 2 Luxe",
      price: "12,50 €",
      desc: "Deux viandes au choix, double fromage, sauce maison, pain gratiné au four.",
      tag: "Populaire",
    },
    {
      name: "Gratin Cheddar Bacon",
      price: "11,90 €",
      desc: "Bacon de bœuf, double cheddar fondu, oignons grillés, sauce barbecue, gratiné au four.",
    },
    {
      name: "Gratin Veggie",
      price: "9,90 €",
      desc: "Légumes grillés, brie, mozzarella, sauce pesto, pain artisanal au four.",
    },
  ],
  sides: [
    { name: "Frites maison", price: "3,90 €", desc: "Coupées épaisses, double cuisson, fleur de sel." },
    {
      name: "Cheddar Bacon Fries",
      price: "6,50 €",
      desc: "Frites maison, cheddar fondu coulant, bacon de bœuf croustillant.",
      tag: "Cultes",
    },
    { name: "Tenders maison", price: "5,90 €", desc: "Aiguillettes de poulet panées, sauce au choix. x5." },
    { name: "Nuggets", price: "4,90 €", desc: "x6, sauce au choix." },
    { name: "Onion Rings", price: "4,50 €", desc: "Anneaux d'oignon panés croustillants." },
  ],
  desserts: [
    {
      name: "Tiramisu maison",
      price: "4,50 €",
      desc: "Mascarpone, café, cacao amer. La recette qu'on refait chaque matin.",
    },
    { name: "Donuts", price: "3,50 €", desc: "Glacé chocolat, vanille ou fraise. Moelleux comme il faut." },
    { name: "Cookie XL", price: "3,90 €", desc: "Pépites de chocolat, cœur fondant, sortie de four." },
    {
      name: "Milkshake",
      price: "5,50 €",
      desc: "Vanille · chocolat · fraise · spéculoos. Préparé minute.",
    },
    { name: "Boissons", price: "2,50 €", desc: "Coca, Fanta, Oasis, Ice Tea, Perrier, eau." },
  ],
};

export const CATEGORIES = [
  { key: "burgers", label: "Burgers" },
  { key: "tacos", label: "Tacos" },
  { key: "gratines", label: "Gratinés" },
  { key: "sides", label: "À côté" },
  { key: "desserts", label: "Desserts" },
];
