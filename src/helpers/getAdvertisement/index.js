export default function () {
  const arr = ["art", "sport", "food", "music"];
  const randomNumber = Math.floor(Math.random() * arr.length);

  return {
    big: arr[randomNumber],
    small: arr[randomNumber] || arr[0],
  };
}
