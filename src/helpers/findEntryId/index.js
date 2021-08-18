export default function (mediaDetails, striveMediaId) {
  const file = mediaDetails.find((data) => data.striveMediaId.id === striveMediaId);
  return file?.entryId?.id;
}
