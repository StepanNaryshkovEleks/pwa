export default function (data) {
  return data.sort((a, b) => {
    const dateA =
      a.challengePotential.challengeState.challengeDefinition.challengeCreationTimestamp;
    const dateB =
      b.challengePotential.challengeState.challengeDefinition.challengeCreationTimestamp;
    if (dateA < dateB) {
      return 1;
    }
    if (dateA > dateB) {
      return -1;
    }
    return 0;
  });
}
