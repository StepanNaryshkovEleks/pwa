export default function getInterests(obg) {
  const res = [];

  for (const key in obg) {
    if (obg[key]) res.push(key);
  }

  return res;
}
