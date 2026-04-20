import { useState } from 'react'
import { fetchAllTeams, sendFinalResult as postFinalResult } from './api.js'
import { buildFinalResultPayload, findFinalMatch } from './finalResult.js'
import {
  drawGroups,
  generateGroupStageScheduleList,
  simulateGroupStageScheduleList,
  calculateGroupStandingsList,
  generateKnockoutStageList,
  simulateKnockoutStageList,
  findChampionTeam,
} from './engine.js'

function getErrorMessage(error, fallbackMessage) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallbackMessage
}

function useTournament() {
  const [teamList, setTeamList] = useState([])
  const [groupList, setGroupList] = useState([])
  const [groupStageScheduleList, setGroupStageScheduleList] = useState([])
  const [groupStandingsList, setGroupStandingsList] = useState([])
  const [knockoutStageList, setKnockoutStageList] = useState([])
  const [championTeam, setChampionTeam] = useState(null)
  const [isLoadingTeams, setIsLoadingTeams] = useState(false)
  const [isSendingFinalResult, setIsSendingFinalResult] = useState(false)
  const [hasSentFinalResult, setHasSentFinalResult] = useState(false)
  const [statusMessage, setStatusMessage] = useState(
    'Nenhuma simulação foi iniciada ainda. Carregue as seleções para começar.',
  )
  const [statusVariant, setStatusVariant] = useState('warning')

  async function loadTeams() {
    if (isLoadingTeams) {
      return
    }

    if (teamList.length > 0) {
      setStatusVariant('info')
      setStatusMessage('As seleções já foram carregadas.')
      return
    }

    setIsLoadingTeams(true)
    setStatusVariant('info')
    setStatusMessage('Carregando seleções da API...')

    try {
      const loadedTeamList = await fetchAllTeams()

      setTeamList(loadedTeamList)
      setStatusVariant('success')
      setStatusMessage(
        `${loadedTeamList.length} seleções carregadas com sucesso.`,
      )
    } catch (error) {
      console.error(error)
      setStatusVariant('error')
      setStatusMessage(
        getErrorMessage(
          error,
          'Não foi possível carregar as seleções. Tente novamente.',
        ),
      )
    } finally {
      setIsLoadingTeams(false)
    }
  }

  function sortGroups() {
    if (teamList.length === 0) {
      setStatusVariant('warning')
      setStatusMessage(
        'Carregue as seleções antes de realizar o sorteio dos grupos.',
      )
      return
    }

    if (groupList.length > 0) {
      setStatusVariant('info')
      setStatusMessage('Os grupos já foram sorteados.')
      return
    }

    const drawnGroupList = drawGroups(teamList)

    setGroupList(drawnGroupList)
    setStatusVariant('success')
    setStatusMessage('Os grupos foram sorteados com sucesso.')
  }

  function generateGroupStageMatches() {
    if (groupList.length === 0) {
      setStatusVariant('warning')
      setStatusMessage(
        'Sorteie os grupos antes de gerar as partidas da fase de grupos.',
      )
      return
    }

    if (groupStageScheduleList.length > 0) {
      setStatusVariant('info')
      setStatusMessage('As partidas da fase de grupos já foram geradas.')
      return
    }

    const generatedGroupStageScheduleList =
      generateGroupStageScheduleList(groupList)

    setGroupStageScheduleList(generatedGroupStageScheduleList)
    setStatusVariant('success')
    setStatusMessage('As partidas da fase de grupos já estão prontas.')
  }

  function simulateGroupStage() {
    if (groupStageScheduleList.length === 0) {
      setStatusVariant('warning')
      setStatusMessage(
        'Gere as partidas da fase de grupos antes de simular os resultados.',
      )
      return
    }

    if (groupStandingsList.length > 0) {
      setStatusVariant('info')
      setStatusMessage('A fase de grupos já foi simulada.')
      return
    }

    const simulatedGroupStageScheduleList =
      simulateGroupStageScheduleList(groupStageScheduleList)

    const calculatedGroupStandingsList =
      calculateGroupStandingsList(simulatedGroupStageScheduleList)

    setGroupStageScheduleList(simulatedGroupStageScheduleList)
    setGroupStandingsList(calculatedGroupStandingsList)
    setStatusVariant('success')
    setStatusMessage('A fase de grupos foi simulada com sucesso.')
  }

  function generateKnockoutStage() {
    if (groupStandingsList.length === 0) {
      setStatusVariant('warning')
      setStatusMessage('Simule a fase de grupos antes de gerar o mata-mata.')
      return
    }

    if (knockoutStageList.length > 0) {
      setStatusVariant('info')
      setStatusMessage('O mata-mata já foi gerado.')
      return
    }

    const generatedKnockoutStageList =
      generateKnockoutStageList(groupStandingsList)

    setKnockoutStageList(generatedKnockoutStageList)
    setStatusVariant('success')
    setStatusMessage('As oitavas de final foram definidas com sucesso.')
  }

  function simulateKnockoutStage() {
    if (knockoutStageList.length === 0) {
      setStatusVariant('warning')
      setStatusMessage('Gere o mata-mata antes de simular as fases finais.')
      return
    }

    if (championTeam !== null) {
      setStatusVariant('info')
      setStatusMessage('As fases finais já foram simuladas.')
      return
    }

    const simulatedKnockoutStageList =
      simulateKnockoutStageList(knockoutStageList)

    const definedChampionTeam = findChampionTeam(simulatedKnockoutStageList)

    setKnockoutStageList(simulatedKnockoutStageList)
    setChampionTeam(definedChampionTeam)
    setStatusVariant('success')
    setStatusMessage('As fases finais foram simuladas com sucesso.')
  }

  async function sendFinalResult() {
    if (championTeam === null) {
      setStatusVariant('warning')
      setStatusMessage(
        'Simule as fases finais antes de enviar o resultado final.',
      )
      return
    }

    if (hasSentFinalResult) {
      setStatusVariant('info')
      setStatusMessage('O resultado final já foi enviado para a API.')
      return
    }

    const finalMatch = findFinalMatch(knockoutStageList)

    if (!finalMatch) {
      setStatusVariant('error')
      setStatusMessage(
        'Não foi possível localizar a partida final para enviar o resultado.',
      )
      return
    }

    const finalResultPayload = buildFinalResultPayload(finalMatch)

    setIsSendingFinalResult(true)
    setStatusVariant('info')
    setStatusMessage('Enviando resultado final...')

    try {
      await postFinalResult(finalResultPayload)

      setHasSentFinalResult(true)
      setStatusVariant('success')
      setStatusMessage('O resultado final foi enviado com sucesso.')
    } catch (error) {
      console.error(error)
      setStatusVariant('error')
      setStatusMessage(
        getErrorMessage(
          error,
          'Não foi possível enviar o resultado final. Tente novamente.',
        ),
      )
    } finally {
      setIsSendingFinalResult(false)
    }
  }

  return {
    teamList,
    groupList,
    groupStageScheduleList,
    groupStandingsList,
    knockoutStageList,
    championTeam,
    isLoadingTeams,
    isSendingFinalResult,
    hasSentFinalResult,
    statusMessage,
    statusVariant,
    loadTeams,
    sortGroups,
    generateGroupStageMatches,
    simulateGroupStage,
    generateKnockoutStage,
    simulateKnockoutStage,
    sendFinalResult,
  }
}

export default useTournament