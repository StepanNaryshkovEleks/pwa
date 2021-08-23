export default function (striveParticipantEntryArray, striveMediaId) {
  return (
    striveParticipantEntryArray.find((data) => data.striveMediaId.id === striveMediaId)
      ?.voteCount || 0
  );
}
