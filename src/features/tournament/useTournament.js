import { useState } from 'react'
import { fetchAllTeams } from './api.js'

function useTournament() {
  const [teamList, setTeamList] = useState([])
  const [isLoadingTeams, setIsLoadingTeams] = useState(false)
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
      setStatusMessage(
        'As seleções já foram carregadas.',
      )
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
        'Não foi possível carregar as seleções. Tente novamente.',
      )
    } finally {
      setIsLoadingTeams(false)
    }
  }

  return {
    teamList,
    isLoadingTeams,
    statusMessage,
    statusVariant,
    loadTeams,
  }
}

export default useTournament