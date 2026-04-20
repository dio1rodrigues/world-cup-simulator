function getLoadTeamsButtonLabel(isLoadingTeams, hasLoadedTeams) {
  if (isLoadingTeams) {
    return 'Carregando seleções...'
  }

  if (hasLoadedTeams) {
    return 'Seleções carregadas'
  }

  return 'Carregar seleções'
}

function getSendFinalResultButtonLabel(isSendingFinalResult, hasSentFinalResult) {
  if (isSendingFinalResult) {
    return 'Enviando resultado final...'
  }

  if (hasSentFinalResult) {
    return 'Resultado final enviado'
  }

  return 'Enviar resultado final'
}

function getActionPanelDescription(
  loadedTeamCount,
  hasDrawnGroups,
  hasGeneratedGroupStageMatches,
  hasSimulatedGroupStage,
  hasGeneratedKnockoutStage,
  hasSimulatedKnockoutStage,
  hasSentFinalResult,
) {
  if (hasSentFinalResult) {
    return 'O resultado final já foi enviado para a API.'
  }

  if (hasSimulatedKnockoutStage) {
    return 'O mata-mata já foi simulado e o campeão já está definido.'
  }

  if (hasGeneratedKnockoutStage) {
    return 'As fases finais já foram definidas. Agora você já pode simular o mata-mata.'
  }

  if (hasSimulatedGroupStage) {
    return 'A fase de grupos já foi simulada e a classificação está pronta.'
  }

  if (hasGeneratedGroupStageMatches) {
    return 'As partidas da fase de grupos já estão prontas. Agora você já pode simular a fase de grupos.'
  }

  if (hasDrawnGroups) {
    return 'Os grupos já foram sorteados. Agora você já pode gerar as partidas da fase de grupos.'
  }

  if (loadedTeamCount > 0) {
    return `${loadedTeamCount} seleções carregadas e prontas para o sorteio.`
  }

  return 'Esta área controla o fluxo principal da simulação.'
}

function getProgressStepList(props) {
  const {
    hasLoadedTeams,
    hasDrawnGroups,
    hasGeneratedGroupStageMatches,
    hasSimulatedGroupStage,
    hasGeneratedKnockoutStage,
    hasSimulatedKnockoutStage,
    hasSentFinalResult,
  } = props

  return [
    { label: 'Seleções', isComplete: hasLoadedTeams },
    { label: 'Grupos', isComplete: hasDrawnGroups },
    {
      label: 'Partidas',
      isComplete: hasGeneratedGroupStageMatches,
    },
    {
      label: 'Classificação',
      isComplete: hasSimulatedGroupStage,
    },
    {
      label: 'Mata-mata',
      isComplete: hasGeneratedKnockoutStage,
    },
    {
      label: 'Campeão',
      isComplete: hasSimulatedKnockoutStage,
    },
    {
      label: 'API',
      isComplete: hasSentFinalResult,
    },
  ]
}

function getProgressStepClassName(isComplete) {
  if (isComplete) {
    return 'rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200'
  }

  return 'rounded-full border border-slate-800 bg-slate-950/60 px-3 py-1 text-xs font-medium text-slate-400'
}

function getActionButtonClassName(variant) {
  const baseClassName =
    'w-full rounded-xl border px-4 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60'

  if (variant === 'primary') {
    return `${baseClassName} border-blue-500/30 bg-blue-600 text-white hover:bg-blue-500`
  }

  if (variant === 'success') {
    return `${baseClassName} border-emerald-500/30 bg-emerald-600 text-white hover:bg-emerald-500`
  }

  return `${baseClassName} border-slate-800 bg-slate-800 text-slate-200 hover:bg-slate-700`
}

function ActionPanel(props) {
  const {
    onLoadTeams,
    onSortGroups,
    onGenerateGroupStageMatches,
    onSimulateGroupStage,
    onGenerateKnockoutStage,
    onSimulateKnockoutStage,
    onSendFinalResult,
    isLoadingTeams,
    isSendingFinalResult,
    hasLoadedTeams,
    hasDrawnGroups,
    hasGeneratedGroupStageMatches,
    hasSimulatedGroupStage,
    hasGeneratedKnockoutStage,
    hasSimulatedKnockoutStage,
    hasSentFinalResult,
    loadedTeamCount,
  } = props

  const loadTeamsButtonLabel = getLoadTeamsButtonLabel(
    isLoadingTeams,
    hasLoadedTeams,
  )

  const sendFinalResultButtonLabel = getSendFinalResultButtonLabel(
    isSendingFinalResult,
    hasSentFinalResult,
  )

  const actionPanelDescription = getActionPanelDescription(
    loadedTeamCount,
    hasDrawnGroups,
    hasGeneratedGroupStageMatches,
    hasSimulatedGroupStage,
    hasGeneratedKnockoutStage,
    hasSimulatedKnockoutStage,
    hasSentFinalResult,
  )

  const progressStepList = getProgressStepList({
    hasLoadedTeams,
    hasDrawnGroups,
    hasGeneratedGroupStageMatches,
    hasSimulatedGroupStage,
    hasGeneratedKnockoutStage,
    hasSimulatedKnockoutStage,
    hasSentFinalResult,
  })

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-100">
            Painel de ações
          </h2>
          <p className="mt-1 max-w-3xl text-sm text-slate-400">
            {actionPanelDescription}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            Seleções disponíveis
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-50">
            {loadedTeamCount}/32
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {progressStepList.map(function renderProgressStep(progressStep) {
          return (
            <span
              key={progressStep.label}
              className={getProgressStepClassName(progressStep.isComplete)}
            >
              {progressStep.label}
            </span>
          )
        })}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <button
          type="button"
          onClick={onLoadTeams}
          disabled={isLoadingTeams || hasLoadedTeams}
          className={getActionButtonClassName('primary')}
        >
          {loadTeamsButtonLabel}
        </button>

        <button
          type="button"
          onClick={onSortGroups}
          disabled={!hasLoadedTeams || hasDrawnGroups}
          className={getActionButtonClassName('secondary')}
        >
          Sortear grupos
        </button>

        <button
          type="button"
          onClick={onGenerateGroupStageMatches}
          disabled={!hasDrawnGroups || hasGeneratedGroupStageMatches}
          className={getActionButtonClassName('secondary')}
        >
          Gerar partidas da fase de grupos
        </button>

        <button
          type="button"
          onClick={onSimulateGroupStage}
          disabled={!hasGeneratedGroupStageMatches || hasSimulatedGroupStage}
          className={getActionButtonClassName('secondary')}
        >
          Simular fase de grupos
        </button>

        <button
          type="button"
          onClick={onGenerateKnockoutStage}
          disabled={!hasSimulatedGroupStage || hasGeneratedKnockoutStage}
          className={getActionButtonClassName('secondary')}
        >
          Gerar mata-mata
        </button>

        <button
          type="button"
          onClick={onSimulateKnockoutStage}
          disabled={!hasGeneratedKnockoutStage || hasSimulatedKnockoutStage}
          className={getActionButtonClassName('secondary')}
        >
          Simular fases finais
        </button>

        <button
          type="button"
          onClick={onSendFinalResult}
          disabled={
            !hasSimulatedKnockoutStage ||
            hasSentFinalResult ||
            isSendingFinalResult
          }
          className={getActionButtonClassName('success')}
        >
          {sendFinalResultButtonLabel}
        </button>
      </div>
    </section>
  )
}

export default ActionPanel