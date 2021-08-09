export default function (data) {
  try {
    const winnerId = data.selectParticipantEntryArray[0].selectEntryId.id;
    const userId = data.striveParticipantEntryArray.filter(
      (user) => user.entryId.id === winnerId
    )[0].participantId;
    return data.participantArray.filter((user) => user.participantId === userId)[0]
      .participantName;
  } catch (e) {
    return "";
  }
}
