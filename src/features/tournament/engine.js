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

function copyTeamList(teamList) {
  return [...teamList]
}

function shuffleTeamList(teamList) {
  const shuffledTeamList = copyTeamList(teamList)

  for (let currentIndex = shuffledTeamList.length - 1; currentIndex > 0; currentIndex -= 1) {
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
  const shuffledTeamList = shuffleTeamList(teamList)
  return distributeTeamsIntoGroups(shuffledTeamList)
}

function validateGroupTeamList(groupItem) {
  if (groupItem.teamList.length !== 4) {
    throw new Error(`O ${groupItem.groupName} não possui 4 seleções para gerar as partidas.`)
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

const goalCountPool = [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 5]

function generateRandomGoalCount() {
  const randomIndex = Math.floor(Math.random() * goalCountPool.length)
  return goalCountPool[randomIndex]
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

function createStandingRow(teamItem) {
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
    isQualified: false,
  }
}

function createStandingRowList(teamList) {
  const standingRowList = []

  for (const teamItem of teamList) {
    standingRowList.push(createStandingRow(teamItem))
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

function applyMatchResultToStandingRows(homeStandingRow, awayStandingRow, matchItem) {
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

  sortedStandingRowList.sort(function compareStandingRows(firstStandingRow, secondStandingRow) {
    if (secondStandingRow.points !== firstStandingRow.points) {
      return secondStandingRow.points - firstStandingRow.points
    }

    if (secondStandingRow.goalDifference !== firstStandingRow.goalDifference) {
      return secondStandingRow.goalDifference - firstStandingRow.goalDifference
    }

    return Math.random() < 0.5 ? -1 : 1
  })

  return sortedStandingRowList
}

function markQualifiedTeams(sortedStandingRowList) {
  const qualifiedStandingRowList = []

  for (let standingRowIndex = 0; standingRowIndex < sortedStandingRowList.length; standingRowIndex += 1) {
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

function calculateGroupStandings(groupStageScheduleItem) {
  const firstRound = groupStageScheduleItem.roundList[0]
  const teamList = [
    firstRound.matchList[0].homeTeam,
    firstRound.matchList[0].awayTeam,
    firstRound.matchList[1].homeTeam,
    firstRound.matchList[1].awayTeam,
  ]

  const standingRowList = createStandingRowList(teamList)
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

    applyMatchResultToStandingRows(homeStandingRow, awayStandingRow, matchItem)
  }

  const sortedStandingRowList = sortStandingRowList(standingRowList)
  const qualifiedStandingRowList = markQualifiedTeams(sortedStandingRowList)

  return {
    groupName: groupStageScheduleItem.groupName,
    standingsList: qualifiedStandingRowList,
  }
}

function calculateGroupStandingsList(groupStageScheduleList) {
  const groupStandingsList = []

  for (const groupStageScheduleItem of groupStageScheduleList) {
    const groupStandings = calculateGroupStandings(groupStageScheduleItem)
    groupStandingsList.push(groupStandings)
  }

  return groupStandingsList
}

export {
  drawGroups,
  generateGroupStageScheduleList,
  simulateGroupStageScheduleList,
  calculateGroupStandingsList,
}