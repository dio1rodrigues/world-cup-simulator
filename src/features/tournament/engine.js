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

export { drawGroups, generateGroupStageScheduleList }