import challenge1 from "../images/challenge1.png";
import challenge2 from "../images/challenge2.png";
import challenge3 from "../images/challenge3.png";
import challenge4 from "../images/challenge4.png";
import challenge5 from "../images/challenge5.png";
import challenge6 from "../images/challenge6.png";
import challenge7 from "../images/challenge7.png";
import challenge8 from "../images/challenge8.png";

const challengeImages = [
  challenge1,
  challenge2,
  challenge3,
  challenge4,
  challenge5,
  challenge6,
  challenge7,
  challenge8,
];

export const getRandomImage = (challengeIndex) =>
  challengeImages[challengeIndex % challengeImages.length];
