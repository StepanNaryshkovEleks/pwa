function bytesToHexString(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xf).toString(16));
  }
  return hex.join("");
}

function stringToBytes(string) {
  var bytes = [];
  for (var i = 0; i < string.length; ++i) {
    bytes.push(string.charCodeAt(i));
  }

  return bytes;
}

function base64ToString(data) {
  if (data == null) {
    return null;
  }
  return atob(data);
}

export default function base64ToHexString(data) {
  if (data == null) {
    return null;
  }
  return bytesToHexString(stringToBytes(base64ToString(data)));
}
