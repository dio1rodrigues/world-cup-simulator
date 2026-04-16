const teamsEndpointUrl = '/api/WorldCup/GetAllTeams'

const gitUserHeaderName = 'git-user'
const gitUserHeaderValue = 'dio1rodrigues'

function buildTeamsRequestOptions() {
  return {
    method: 'GET',
    headers: {
      [gitUserHeaderName]: gitUserHeaderValue,
    },
  }
}

function validateTeamsResponse(response) {
  if (!response.ok) {
    throw new Error(`Falha ao buscar seleções. Status: ${response.status}`)
  }
}

function validateTeamItem(teamItem) {
  if (typeof teamItem !== 'object' || teamItem === null) {
    throw new Error('A lista de seleções contém um item inválido.')
  }

  if (typeof teamItem.token !== 'string' || typeof teamItem.nome !== 'string') {
    throw new Error('Uma ou mais seleções retornadas pela API estão em formato inválido.')
  }
}

function validateTeamsData(teamsData) {
  if (!Array.isArray(teamsData)) {
    throw new Error('A resposta da API de seleções não retornou uma lista válida.')
  }

  for (const teamItem of teamsData) {
    validateTeamItem(teamItem)
  }

  return teamsData
}

async function fetchAllTeams() {
  const requestOptions = buildTeamsRequestOptions()
  const response = await fetch(teamsEndpointUrl, requestOptions)

  validateTeamsResponse(response)

  const teamsData = await response.json()

  return validateTeamsData(teamsData)
}

export { fetchAllTeams }