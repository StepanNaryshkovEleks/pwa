export default function (voteParticipantEntryArray, id, participantId) {
  return voteParticipantEntryArray.find(
    (data) => data.voteEntryId.id === id && data.participantId === participantId
  );
}
