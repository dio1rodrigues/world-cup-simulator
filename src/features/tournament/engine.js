const groupNameList = [
  'Grupo A',
  'Grupo B',
  'Grupo C',
  'Grupo D',
  'Grupo E',
  'Grupo F',
  'Grupo G',
  'Grupo H',
]

const requiredTeamCount = 32

const goalCountPool = [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 5]
const penaltyGoalCountPool = [3, 4, 4, 4, 5, 5, 5, 6]

function validateTournamentTeamList(teamList) {
  if (!Array.isArray(teamList)) {
    throw new Error('A lista de seleções do torneio é inválida.')
  }

  if (teamList.length !== requiredTeamCount) {
    throw new Error(
      `O torneio precisa de ${requiredTeamCount} seleções para o sorteio.`,
    )
  }
}

function copyTeamList(teamList) {
  return [...teamList]
}

function shuffleTeamList(teamList) {
  const shuffledTeamList = copyTeamList(teamList)

  for (
    let currentIndex = shuffledTeamList.length - 1;
    currentIndex > 0;
    currentIndex -= 1
  ) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1))
    const currentTeam = shuffledTeamList[currentIndex]

    shuffledTeamList[currentIndex] = shuffledTeamList[randomIndex]
    shuffledTeamList[randomIndex] = currentTeam
  }

  return shuffledTeamList
}

function createEmptyGroupList() {
  const groupList = []

  for (const groupName of groupNameList) {
    groupList.push({
      groupName,
      teamList: [],
    })
  }

  return groupList
}

function distributeTeamsIntoGroups(shuffledTeamList) {
  const groupList = createEmptyGroupList()

  for (let teamIndex = 0; teamIndex < shuffledTeamList.length; teamIndex += 1) {
    const groupIndex = Math.floor(teamIndex / 4)
    const currentTeam = shuffledTeamList[teamIndex]

    groupList[groupIndex].teamList.push(currentTeam)
  }

  return groupList
}

function drawGroups(teamList) {
  validateTournamentTeamList(teamList)

  const shuffledTeamList = shuffleTeamList(teamList)

  return distributeTeamsIntoGroups(shuffledTeamList)
}

function validateGroupTeamList(groupItem) {
  if (groupItem.teamList.length !== 4) {
    throw new Error(
      `O ${groupItem.groupName} não possui 4 seleções para gerar as partidas.`,
    )
  }
}

function createGroupMatch(groupName, roundNumber, homeTeam, awayTeam) {
  return {
    groupName,
    roundNumber,
    homeTeam,
    awayTeam,
    homeGoals: null,
    awayGoals: null,
  }
}

function createGroupRound(groupName, roundNumber, matchList) {
  return {
    groupName,
    roundNumber,
    matchList,
  }
}

function createGroupStageSchedule(groupItem) {
  validateGroupTeamList(groupItem)

  const teamOne = groupItem.teamList[0]
  const teamTwo = groupItem.teamList[1]
  const teamThree = groupItem.teamList[2]
  const teamFour = groupItem.teamList[3]

  const roundOneMatchList = [
    createGroupMatch(groupItem.groupName, 1, teamOne, teamTwo),
    createGroupMatch(groupItem.groupName, 1, teamThree, teamFour),
  ]

  const roundTwoMatchList = [
    createGroupMatch(groupItem.groupName, 2, teamOne, teamThree),
    createGroupMatch(groupItem.groupName, 2, teamTwo, teamFour),
  ]

  const roundThreeMatchList = [
    createGroupMatch(groupItem.groupName, 3, teamOne, teamFour),
    createGroupMatch(groupItem.groupName, 3, teamTwo, teamThree),
  ]

  return {
    groupName: groupItem.groupName,
    roundList: [
      createGroupRound(groupItem.groupName, 1, roundOneMatchList),
      createGroupRound(groupItem.groupName, 2, roundTwoMatchList),
      createGroupRound(groupItem.groupName, 3, roundThreeMatchList),
    ],
  }
}

function generateGroupStageScheduleList(groupList) {
  const groupStageScheduleList = []

  for (const groupItem of groupList) {
    const groupStageSchedule = createGroupStageSchedule(groupItem)
    groupStageScheduleList.push(groupStageSchedule)
  }

  return groupStageScheduleList
}

function generateRandomGoalCount() {
  const randomIndex = Math.floor(Math.random() * goalCountPool.length)
  return goalCountPool[randomIndex]
}

function generateRandomPenaltyGoalCount() {
  const randomIndex = Math.floor(Math.random() * penaltyGoalCountPool.length)
  return penaltyGoalCountPool[randomIndex]
}

function simulateGroupStageMatch(matchItem) {
  return {
    ...matchItem,
    homeGoals: generateRandomGoalCount(),
    awayGoals: generateRandomGoalCount(),
  }
}

function simulateGroupStageRound(roundItem) {
  const simulatedMatchList = []

  for (const matchItem of roundItem.matchList) {
    const simulatedMatchItem = simulateGroupStageMatch(matchItem)
    simulatedMatchList.push(simulatedMatchItem)
  }

  return {
    ...roundItem,
    matchList: simulatedMatchList,
  }
}

function simulateGroupStageSchedule(groupStageScheduleItem) {
  const simulatedRoundList = []

  for (const roundItem of groupStageScheduleItem.roundList) {
    const simulatedRoundItem = simulateGroupStageRound(roundItem)
    simulatedRoundList.push(simulatedRoundItem)
  }

  return {
    ...groupStageScheduleItem,
    roundList: simulatedRoundList,
  }
}

function simulateGroupStageScheduleList(groupStageScheduleList) {
  const simulatedGroupStageScheduleList = []

  for (const groupStageScheduleItem of groupStageScheduleList) {
    const simulatedGroupStageScheduleItem =
      simulateGroupStageSchedule(groupStageScheduleItem)

    simulatedGroupStageScheduleList.push(simulatedGroupStageScheduleItem)
  }

  return simulatedGroupStageScheduleList
}

function createStandingRow(teamItem, drawTieBreakerValue) {
  return {
    teamToken: teamItem.token,
    teamName: teamItem.nome,
    playedMatchCount: 0,
    winCount: 0,
    drawCount: 0,
    lossCount: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    drawTieBreakerValue,
    isQualified: false,
  }
}

function createStandingRowList(teamList, randomNumberGenerator = Math.random) {
  const standingRowList = []

  for (const teamItem of teamList) {
    standingRowList.push(
      createStandingRow(teamItem, randomNumberGenerator()),
    )
  }

  return standingRowList
}

function findStandingRowByTeamToken(standingRowList, teamToken) {
  for (const standingRow of standingRowList) {
    if (standingRow.teamToken === teamToken) {
      return standingRow
    }
  }

  return null
}

function updateStandingRowGoalDifference(standingRow) {
  standingRow.goalDifference = standingRow.goalsFor - standingRow.goalsAgainst
}

function applyMatchResultToStandingRows(
  homeStandingRow,
  awayStandingRow,
  matchItem,
) {
  homeStandingRow.playedMatchCount += 1
  awayStandingRow.playedMatchCount += 1

  homeStandingRow.goalsFor += matchItem.homeGoals
  homeStandingRow.goalsAgainst += matchItem.awayGoals

  awayStandingRow.goalsFor += matchItem.awayGoals
  awayStandingRow.goalsAgainst += matchItem.homeGoals

  if (matchItem.homeGoals > matchItem.awayGoals) {
    homeStandingRow.winCount += 1
    awayStandingRow.lossCount += 1
    homeStandingRow.points += 3
  } else if (matchItem.homeGoals < matchItem.awayGoals) {
    awayStandingRow.winCount += 1
    homeStandingRow.lossCount += 1
    awayStandingRow.points += 3
  } else {
    homeStandingRow.drawCount += 1
    awayStandingRow.drawCount += 1
    homeStandingRow.points += 1
    awayStandingRow.points += 1
  }

  updateStandingRowGoalDifference(homeStandingRow)
  updateStandingRowGoalDifference(awayStandingRow)
}

function sortStandingRowList(standingRowList) {
  const sortedStandingRowList = [...standingRowList]

  sortedStandingRowList.sort(function compareStandingRows(
    firstStandingRow,
    secondStandingRow,
  ) {
    if (secondStandingRow.points !== firstStandingRow.points) {
      return secondStandingRow.points - firstStandingRow.points
    }

    if (
      secondStandingRow.goalDifference !== firstStandingRow.goalDifference
    ) {
      return secondStandingRow.goalDifference - firstStandingRow.goalDifference
    }

    return (
      secondStandingRow.drawTieBreakerValue -
      firstStandingRow.drawTieBreakerValue
    )
  })

  return sortedStandingRowList
}

function markQualifiedTeams(sortedStandingRowList) {
  const qualifiedStandingRowList = []

  for (
    let standingRowIndex = 0;
    standingRowIndex < sortedStandingRowList.length;
    standingRowIndex += 1
  ) {
    const currentStandingRow = sortedStandingRowList[standingRowIndex]

    qualifiedStandingRowList.push({
      ...currentStandingRow,
      isQualified: standingRowIndex < 2,
    })
  }

  return qualifiedStandingRowList
}

function flattenGroupStageMatchList(groupStageScheduleItem) {
  const flattenedMatchList = []

  for (const roundItem of groupStageScheduleItem.roundList) {
    for (const matchItem of roundItem.matchList) {
      flattenedMatchList.push(matchItem)
    }
  }

  return flattenedMatchList
}

function calculateGroupStandings(
  groupStageScheduleItem,
  randomNumberGenerator = Math.random,
) {
  const firstRound = groupStageScheduleItem.roundList[0]
  const teamList = [
    firstRound.matchList[0].homeTeam,
    firstRound.matchList[0].awayTeam,
    firstRound.matchList[1].homeTeam,
    firstRound.matchList[1].awayTeam,
  ]

  const standingRowList = createStandingRowList(
    teamList,
    randomNumberGenerator,
  )
  const matchList = flattenGroupStageMatchList(groupStageScheduleItem)

  for (const matchItem of matchList) {
    const homeStandingRow = findStandingRowByTeamToken(
      standingRowList,
      matchItem.homeTeam.token,
    )

    const awayStandingRow = findStandingRowByTeamToken(
      standingRowList,
      matchItem.awayTeam.token,
    )

    applyMatchResultToStandingRows(
      homeStandingRow,
      awayStandingRow,
      matchItem,
    )
  }

  const sortedStandingRowList = sortStandingRowList(standingRowList)
  const qualifiedStandingRowList = markQualifiedTeams(sortedStandingRowList)

  return {
    groupName: groupStageScheduleItem.groupName,
    standingsList: qualifiedStandingRowList,
  }
}

function calculateGroupStandingsList(
  groupStageScheduleList,
  randomNumberGenerator = Math.random,
) {
  const groupStandingsList = []

  for (const groupStageScheduleItem of groupStageScheduleList) {
    const groupStandings = calculateGroupStandings(
      groupStageScheduleItem,
      randomNumberGenerator,
    )
    groupStandingsList.push(groupStandings)
  }

  return groupStandingsList
}

function findGroupStandingsByName(groupStandingsList, groupName) {
  for (const groupStandingsItem of groupStandingsList) {
    if (groupStandingsItem.groupName === groupName) {
      return groupStandingsItem
    }
  }

  return null
}

function findQualifiedTeamByPosition(groupStandingsItem, position) {
  return groupStandingsItem.standingsList[position]
}

function createKnockoutMatch(stageName, matchLabel, homeTeam, awayTeam) {
  return {
    stageName,
    matchLabel,
    homeTeam: {
      token: homeTeam.teamToken,
      nome: homeTeam.teamName,
    },
    awayTeam: {
      token: awayTeam.teamToken,
      nome: awayTeam.teamName,
    },
    homeGoals: null,
    awayGoals: null,
    homePenaltyGoals: null,
    awayPenaltyGoals: null,
    winnerTeam: null,
  }
}

function createRoundOf16Match(
  groupStandingsList,
  homeGroupName,
  homePosition,
  awayGroupName,
  awayPosition,
  matchNumber,
) {
  const homeGroupStandings = findGroupStandingsByName(
    groupStandingsList,
    homeGroupName,
  )

  const awayGroupStandings = findGroupStandingsByName(
    groupStandingsList,
    awayGroupName,
  )

  if (!homeGroupStandings || !awayGroupStandings) {
    throw new Error(
      'Não foi possível localizar os grupos para montar as oitavas.',
    )
  }

  const homeTeam = findQualifiedTeamByPosition(
    homeGroupStandings,
    homePosition,
  )

  const awayTeam = findQualifiedTeamByPosition(
    awayGroupStandings,
    awayPosition,
  )

  if (!homeTeam || !awayTeam) {
    throw new Error(
      'Não foi possível localizar os classificados para montar as oitavas.',
    )
  }

  return createKnockoutMatch(
    'Oitavas',
    `Oitavas ${matchNumber}`,
    homeTeam,
    awayTeam,
  )
}

function generateRoundOf16MatchList(groupStandingsList) {
  return [
    createRoundOf16Match(groupStandingsList, 'Grupo A', 0, 'Grupo B', 1, 1),
    createRoundOf16Match(groupStandingsList, 'Grupo C', 0, 'Grupo D', 1, 2),
    createRoundOf16Match(groupStandingsList, 'Grupo E', 0, 'Grupo F', 1, 3),
    createRoundOf16Match(groupStandingsList, 'Grupo G', 0, 'Grupo H', 1, 4),
    createRoundOf16Match(groupStandingsList, 'Grupo B', 0, 'Grupo A', 1, 5),
    createRoundOf16Match(groupStandingsList, 'Grupo D', 0, 'Grupo C', 1, 6),
    createRoundOf16Match(groupStandingsList, 'Grupo F', 0, 'Grupo E', 1, 7),
    createRoundOf16Match(groupStandingsList, 'Grupo H', 0, 'Grupo G', 1, 8),
  ]
}

function generateKnockoutStageList(groupStandingsList) {
  const roundOf16MatchList = generateRoundOf16MatchList(groupStandingsList)

  return [
    {
      stageName: 'Oitavas',
      matchList: roundOf16MatchList,
    },
    {
      stageName: 'Quartas',
      matchList: [],
    },
    {
      stageName: 'Semifinal',
      matchList: [],
    },
    {
      stageName: 'Final',
      matchList: [],
    },
  ]
}

function createPenaltyResult() {
  let homePenaltyGoals = generateRandomPenaltyGoalCount()
  let awayPenaltyGoals = generateRandomPenaltyGoalCount()

  while (homePenaltyGoals === awayPenaltyGoals) {
    homePenaltyGoals = generateRandomPenaltyGoalCount()
    awayPenaltyGoals = generateRandomPenaltyGoalCount()
  }

  return {
    homePenaltyGoals,
    awayPenaltyGoals,
  }
}

function defineKnockoutWinner(matchItem) {
  if (matchItem.homeGoals > matchItem.awayGoals) {
    return {
      ...matchItem,
      winnerTeam: matchItem.homeTeam,
    }
  }

  if (matchItem.homeGoals < matchItem.awayGoals) {
    return {
      ...matchItem,
      winnerTeam: matchItem.awayTeam,
    }
  }

  const penaltyResult = createPenaltyResult()

  if (penaltyResult.homePenaltyGoals > penaltyResult.awayPenaltyGoals) {
    return {
      ...matchItem,
      homePenaltyGoals: penaltyResult.homePenaltyGoals,
      awayPenaltyGoals: penaltyResult.awayPenaltyGoals,
      winnerTeam: matchItem.homeTeam,
    }
  }

  return {
    ...matchItem,
    homePenaltyGoals: penaltyResult.homePenaltyGoals,
    awayPenaltyGoals: penaltyResult.awayPenaltyGoals,
    winnerTeam: matchItem.awayTeam,
  }
}

function simulateKnockoutMatch(matchItem) {
  const simulatedMatch = {
    ...matchItem,
    homeGoals: generateRandomGoalCount(),
    awayGoals: generateRandomGoalCount(),
  }

  return defineKnockoutWinner(simulatedMatch)
}

function simulateKnockoutMatchList(matchList) {
  const simulatedMatchList = []

  for (const matchItem of matchList) {
    const simulatedMatchItem = simulateKnockoutMatch(matchItem)
    simulatedMatchList.push(simulatedMatchItem)
  }

  return simulatedMatchList
}

function createNextStageMatchList(previousStageMatchList, stageName) {
  const nextStageMatchList = []

  for (
    let matchIndex = 0;
    matchIndex < previousStageMatchList.length;
    matchIndex += 2
  ) {
    const firstMatch = previousStageMatchList[matchIndex]
    const secondMatch = previousStageMatchList[matchIndex + 1]

    nextStageMatchList.push(
      createKnockoutMatch(
        stageName,
        `${stageName} ${nextStageMatchList.length + 1}`,
        {
          teamToken: firstMatch.winnerTeam.token,
          teamName: firstMatch.winnerTeam.nome,
        },
        {
          teamToken: secondMatch.winnerTeam.token,
          teamName: secondMatch.winnerTeam.nome,
        },
      ),
    )
  }

  return nextStageMatchList
}

function simulateKnockoutStageList(knockoutStageList) {
  const roundOf16MatchList = simulateKnockoutMatchList(
    knockoutStageList[0].matchList,
  )

  const quarterFinalBaseMatchList = createNextStageMatchList(
    roundOf16MatchList,
    'Quartas',
  )
  const quarterFinalMatchList = simulateKnockoutMatchList(
    quarterFinalBaseMatchList,
  )

  const semifinalBaseMatchList = createNextStageMatchList(
    quarterFinalMatchList,
    'Semifinal',
  )
  const semifinalMatchList = simulateKnockoutMatchList(semifinalBaseMatchList)

  const finalBaseMatchList = createNextStageMatchList(
    semifinalMatchList,
    'Final',
  )
  const finalMatchList = simulateKnockoutMatchList(finalBaseMatchList)

  return [
    {
      stageName: 'Oitavas',
      matchList: roundOf16MatchList,
    },
    {
      stageName: 'Quartas',
      matchList: quarterFinalMatchList,
    },
    {
      stageName: 'Semifinal',
      matchList: semifinalMatchList,
    },
    {
      stageName: 'Final',
      matchList: finalMatchList,
    },
  ]
}

function findChampionTeam(knockoutStageList) {
  const finalStage = knockoutStageList[3]

  if (!finalStage || finalStage.matchList.length === 0) {
    return null
  }

  return finalStage.matchList[0].winnerTeam
}

export {
  drawGroups,
  generateGroupStageScheduleList,
  simulateGroupStageScheduleList,
  calculateGroupStandingsList,
  generateKnockoutStageList,
  simulateKnockoutStageList,
  findChampionTeam,
  sortStandingRowList,
  simulateKnockoutMatch,
}