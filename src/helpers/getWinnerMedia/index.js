export default function (data) {
  try {
    const winnerId = data.selectParticipantEntryArray[0].selectEntryId.id;
    return data.striveParticipantEntryArray.filter(
      (user) => user.entryId.id === winnerId
    )[0];
  } catch (e) {
    return "";
  }
}
