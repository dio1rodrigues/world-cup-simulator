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

export { drawGroups }