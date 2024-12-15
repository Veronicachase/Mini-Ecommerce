const Shoes = [
  {
    images: [
      {
        url: "../assets/images/sandals/sandali_verano_black.png",
        color: "Black",
      },
      {
        url: "../assets/images/sandals/sandalia_verano_beige.png",
        color: "Beige",
      },
      {
        url: "../assets/images/sandals/sandali_verano_green.png",
        color: "Green",
      },
    ],

    name: "Sandalia Verano Relax",
    categoria: "Sandalias",
    size: [36, 37, 38, 39, 40],
    color: ["Black", "Beige", "Green"],
    price: 29.99,
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem ",
  },
  {
    images: [
      { url: "../assets/images/boots/bota_invierno_black.png", color: "Black" },
      { url: "../assets/images/boots/bota_invierno_green.png", color: "Green" },
      { url: "../assets/images/boots/bota_invierno_beige.png", color: "Beige" },
    ],
    name: "Bota Invierno Premium",
    categoria: "Botas",
    size: [36, 39, 40],
    color: ["Black", "Green", "Beige"],
    price: 19.99,
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem ",
  },
  {
    images: [
      { url: "../assets/images/sports/deportivas_green.png", color: "Green" },
      { url: "../assets/images/sports/deportivas_white.png", color: "White" },
      { url: "../assets/images/sports/deportivas_marron.png", color: "Marron" },
    ],
    name: "Deportiva Street Style",
    categoria: "Deportivas",
    size: [38, 39, 40],
    color: ["Marron", "White", "Green"],
    price: 25.35,
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem ",
  },
  {
    images: [
      { url: "../assets/images/Heels/heel_red.png", color: "Red" },
      { url: "../assets/images/Heels/heel_silver.png", color: "Silver" },
      { url: "../assets/images/Heels/heel_gold.png", color: "Gold" },
    ],
    name: "Tacón Fiesta Glamour",
    categoria: "Tacones",
    size: [36, 37, 38],
    color: ["Silver", "Gold", "Red"],
    price: 229.01,
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem ",
  },
];

const colorList = {
  silver: "#A5A9B4",
  gold: "#FFD700",
  red: "#FF0000",
  marron: "#A05000",
  beige: "#E8DCCA",
  green: "#008000",
  white: "#FFFFFF",
};

window.Shoes = Shoes;
