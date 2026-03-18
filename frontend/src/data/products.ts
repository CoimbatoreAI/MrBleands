import mangoPickle from "@/assets/mango-pickle.jpg";
import greenChilliPickle from "@/assets/green-chilli-pickle.jpg";
import saltLemonPickle from "@/assets/salt-lemon-pickle.jpg";
import lemonPickle from "@/assets/lemon-pickle.jpg";
import garlicPickle from "@/assets/garlic-pickle.jpg";
import yamPickle from "@/assets/yam-pickle.jpg";
import datesPickle from "@/assets/dates-pickle.jpg";
import mixedPickle from "@/assets/mixed-pickle.jpg";

export interface Product {
  id: string;
  name: string;
  emoji: string;
  image: string;
  price: number;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  { id: "mango", name: "Mango Pickle", emoji: "🥭", image: mangoPickle, price: 199, isBestSeller: true },
  { id: "green-chilli", name: "Green Chilli Pickle", emoji: "🌶", image: greenChilliPickle, price: 179 },
  { id: "salt-lemon", name: "Salt Lemon Pickle", emoji: "🍋", image: saltLemonPickle, price: 169 },
  { id: "lemon", name: "Lemon Pickle", emoji: "🍋", image: lemonPickle, price: 179, isBestSeller: true },
  { id: "garlic", name: "Garlic Pickle", emoji: "🧄", image: garlicPickle, price: 199, isBestSeller: true },
  { id: "yam", name: "Yam Pickle", emoji: "🥔", image: yamPickle, price: 189 },
  { id: "mango-chilli", name: "Mango Green Chilli Mix", emoji: "🥭🌶", image: mangoPickle, price: 209 },
  { id: "yam-dates", name: "Yam Dates Mix Pickle", emoji: "🥔🌴", image: yamPickle, price: 219 },
  { id: "dates", name: "Dates Pickle", emoji: "🌴", image: datesPickle, price: 229, isBestSeller: true },
  { id: "dates-lemon", name: "Dates Lemon Mix", emoji: "🌴🍋", image: datesPickle, price: 219 },
  { id: "dates-cherry", name: "Dates Cherry Raisin Mix", emoji: "🌴🍒", image: datesPickle, price: 239 },
  { id: "mixed-veg", name: "Mixed Vegetable Pickle", emoji: "🥭🥕", image: mixedPickle, price: 199 },
  { id: "papaya-chilli", name: "Papaya Chilli Mix", emoji: "🍈🌶", image: mixedPickle, price: 209 },
];
