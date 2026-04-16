function getLoadTeamsButtonLabel(isLoadingTeams, hasLoadedTeams) {
  if (isLoadingTeams) {
    return 'Carregando seleções...'
  }

  if (hasLoadedTeams) {
    return 'Seleções carregadas'
  }

  return 'Carregar seleções'
}

function getActionPanelDescription(
  loadedTeamCount,
  hasDrawnGroups,
  hasGeneratedGroupStageMatches,
) {
  if (hasGeneratedGroupStageMatches) {
    return 'As partidas da fase de grupos já estão prontas.'
  }

  if (hasDrawnGroups) {
    return 'Os grupos já foram sorteados. Agora você já pode gerar as partidas da fase de grupos.'
  }

  if (loadedTeamCount > 0) {
    return `${loadedTeamCount} seleções carregadas e prontas para o sorteio.`
  }

  return 'Esta área controla o fluxo principal da simulação.'
}

function ActionPanel(props) {
  const {
    onLoadTeams,
    onSortGroups,
    onGenerateGroupStageMatches,
    isLoadingTeams,
    hasLoadedTeams,
    hasDrawnGroups,
    hasGeneratedGroupStageMatches,
    loadedTeamCount,
  } = props

  const loadTeamsButtonLabel = getLoadTeamsButtonLabel(
    isLoadingTeams,
    hasLoadedTeams,
  )

  const actionPanelDescription = getActionPanelDescription(
    loadedTeamCount,
    hasDrawnGroups,
    hasGeneratedGroupStageMatches,
  )

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-100">Painel de ações</h2>
        <p className="mt-1 text-sm text-slate-400">{actionPanelDescription}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onLoadTeams}
          disabled={isLoadingTeams || hasLoadedTeams}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loadTeamsButtonLabel}
        </button>

        <button
          type="button"
          onClick={onSortGroups}
          disabled={!hasLoadedTeams || hasDrawnGroups}
          className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Sortear grupos
        </button>

        <button
          type="button"
          onClick={onGenerateGroupStageMatches}
          disabled={!hasDrawnGroups || hasGeneratedGroupStageMatches}
          className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Gerar partidas da fase de grupos
        </button>

        <button
          type="button"
          disabled
          className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          Gerar mata-mata
        </button>

        <button
          type="button"
          disabled
          className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          Simular fases finais
        </button>

        <button
          type="button"
          disabled
          className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          Enviar resultado final
        </button>
      </div>
    </section>
  )
}

export default ActionPanel