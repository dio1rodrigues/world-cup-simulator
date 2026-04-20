const defaultApiBaseUrl = 'https://development-internship-api.geopostenergy.com'
const teamsEndpointPath = '/WorldCup/GetAllTeams'
const finalResultEndpointPath = '/WorldCup/FinalResult'
const gitUserHeaderName = 'git-user'
const requestTimeoutInMilliseconds = 10000
const requiredTeamCount = 32

function getApiBaseUrl() {
  const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()
  const apiBaseUrl = configuredApiBaseUrl || defaultApiBaseUrl

  return apiBaseUrl.replace(/\/+$/, '')
}

function getGitUserHeaderValue() {
  const configuredGitUser = import.meta.env.VITE_GIT_USER?.trim()

  if (!configuredGitUser) {
    throw new Error(
      'Defina a variável VITE_GIT_USER para enviar o header git-user exigido pela API.',
    )
  }

  return configuredGitUser
}

function buildEndpointUrl(endpointPath) {
  return `${getApiBaseUrl()}${endpointPath}`
}

function buildRequestHeaders(contentType) {
  const requestHeaders = {
    [gitUserHeaderName]: getGitUserHeaderValue(),
  }

  if (contentType) {
    requestHeaders['Content-Type'] = contentType
  }

  return requestHeaders
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

function buildResponseErrorMessage(defaultMessage, responseData) {
  if (responseData === null || responseData === undefined || responseData === '') {
    return defaultMessage
  }

  if (typeof responseData === 'string') {
    return `${defaultMessage} ${responseData}`
  }

  try {
    return `${defaultMessage} ${JSON.stringify(responseData)}`
  } catch {
    return defaultMessage
  }
}

async function validateResponse(response, defaultMessage) {
  if (response.ok) {
    return
  }

  const responseData = await readResponseData(response)

  throw new Error(buildResponseErrorMessage(defaultMessage, responseData))
}

async function fetchWithTimeout(url, requestOptions) {
  const abortController = new AbortController()
  const timeoutId = setTimeout(function abortRequest() {
    abortController.abort()
  }, requestTimeoutInMilliseconds)

  try {
    return await fetch(url, {
      ...requestOptions,
      signal: abortController.signal,
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('A requisição para a API excedeu o tempo limite.')
    }

    throw new Error('Não foi possível se comunicar com a API.')
  } finally {
    clearTimeout(timeoutId)
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

  if (!teamItem.token.trim() || !teamItem.nome.trim()) {
    throw new Error(
      'Uma ou mais seleções retornadas pela API possuem token ou nome vazio.',
    )
  }
}

function validateTeamsData(teamsData) {
  if (!Array.isArray(teamsData)) {
    throw new Error('A resposta da API de seleções não retornou uma lista válida.')
  }

  if (teamsData.length !== requiredTeamCount) {
    throw new Error(
      `A API deveria retornar ${requiredTeamCount} seleções, mas retornou ${teamsData.length}.`,
    )
  }

  const tokenSet = new Set()

  for (const teamItem of teamsData) {
    validateTeamItem(teamItem)

    if (tokenSet.has(teamItem.token)) {
      throw new Error('A API retornou seleções com token duplicado.')
    }

    tokenSet.add(teamItem.token)
  }

  return teamsData
}

async function fetchAllTeams() {
  const response = await fetchWithTimeout(buildEndpointUrl(teamsEndpointPath), {
    method: 'GET',
    headers: buildRequestHeaders(),
  })

  await validateResponse(response, 'A API de seleções retornou um erro.')

  const teamsData = await response.json()

  return validateTeamsData(teamsData)
}

async function sendFinalResult(finalResultPayload) {
  const response = await fetchWithTimeout(
    buildEndpointUrl(finalResultEndpointPath),
    {
      method: 'POST',
      headers: buildRequestHeaders('application/json'),
      body: JSON.stringify(finalResultPayload),
    },
  )

  await validateResponse(response, 'A API de resultado final retornou um erro.')

  return readResponseData(response)
}

export { fetchAllTeams, sendFinalResult }