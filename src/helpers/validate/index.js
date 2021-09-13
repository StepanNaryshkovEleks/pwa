const allowedSymbols = {
  name: /^[a-zA-Z0-9#_-]*$/,
  password: /^[a-zA-Z0-9#_@&$!-]*$/,
};

export default function (string, key) {
  const validateLength = string.length >= 3 && string.length <= 16;
  const regexp = allowedSymbols[key];
  const validateSymbols = regexp.test(string);
  return validateLength && validateSymbols;
}
