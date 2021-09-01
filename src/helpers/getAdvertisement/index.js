import artBig from "./../../images/adv/big/art.png";
import sportBig from "./../../images/adv/big/sport.png";
import foodBig from "./../../images/adv/big/food.png";
import musicBig from "./../../images/adv/big/music.png";

import artSmall from "./../../images/adv/small/art.png";
import sportSmall from "./../../images/adv/small/sport.png";
import foodSmall from "./../../images/adv/small/food.png";
import musicSmall from "./../../images/adv/small/music.png";

export default function () {
  const bigPictures = [artBig, sportBig, foodBig, musicBig];
  const colors = ["#f00", "#ffc933", "#ef4b3b", "#f00"];
  const smallPictures = [artSmall, sportSmall, foodSmall, musicSmall];

  const randomNumber = Math.floor(Math.random() * bigPictures.length);

  return {
    big: bigPictures[randomNumber],
    color: colors[randomNumber + 1] || colors[0],
    small: smallPictures[randomNumber + 1] || smallPictures[0],
  };
}
