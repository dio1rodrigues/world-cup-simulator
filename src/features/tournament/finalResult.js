function findFinalStage(knockoutStageList) {
  for (const stageItem of knockoutStageList) {
    if (stageItem.stageName === 'Final') {
      return stageItem
    }
  }

  return null
}

function findFinalMatch(knockoutStageList) {
  const finalStage = findFinalStage(knockoutStageList)

  if (!finalStage || finalStage.matchList.length === 0) {
    return null
  }

  return finalStage.matchList[0]
}

function buildFinalResultPayload(finalMatch) {
  if (!finalMatch) {
    throw new Error('Não foi possível localizar a partida final.')
  }

  return {
    equipeA: finalMatch.homeTeam.token,
    equipeB: finalMatch.awayTeam.token,
    golsEquipeA: finalMatch.homeGoals,
    golsEquipeB: finalMatch.awayGoals,
    golsPenaltyTimeA: finalMatch.homePenaltyGoals ?? 0,
    golsPenaltyTimeB: finalMatch.awayPenaltyGoals ?? 0,
  }
}

export { findFinalMatch, buildFinalResultPayload }