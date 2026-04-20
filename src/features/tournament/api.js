const teamsEndpointUrl = '/api/WorldCup/GetAllTeams'
const finalResultEndpointUrl = '/api/WorldCup/FinalResult'

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

function buildFinalResultRequestOptions(finalResultPayload) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [gitUserHeaderName]: gitUserHeaderValue,
    },
    body: JSON.stringify(finalResultPayload),
  }
}

function validateTeamsResponse(response) {
  if (!response.ok) {
    throw new Error('A API de seleções retornou uma resposta inválida.')
  }
}

function validateFinalResultResponse(response) {
  if (!response.ok) {
    throw new Error('A API de resultado final retornou uma resposta inválida.')
  }
}

function validateTeamItem(teamItem) {
  if (typeof teamItem !== 'object' || teamItem === null) {
    throw new Error('A lista de seleções contém um item inválido.')
  }

  if (typeof teamItem.token !== 'string' || typeof teamItem.nome !== 'string') {
    throw new Error(
      'Uma ou mais seleções retornadas pela API estão em formato inválido.',
    )
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

async function readResponseData(response) {
  const responseText = await response.text()

  if (!responseText) {
    return null
  }

  try {
    return JSON.parse(responseText)
  } catch {
    return responseText
  }
}

async function fetchAllTeams() {
  const requestOptions = buildTeamsRequestOptions()
  const response = await fetch(teamsEndpointUrl, requestOptions)

  validateTeamsResponse(response)

  const teamsData = await response.json()

  return validateTeamsData(teamsData)
}

async function sendFinalResult(finalResultPayload) {
  const requestOptions = buildFinalResultRequestOptions(finalResultPayload)
  const response = await fetch(finalResultEndpointUrl, requestOptions)

  validateFinalResultResponse(response)

  return readResponseData(response)
}

export { fetchAllTeams, sendFinalResult }