function getTeamRowClassName(teamItem, winnerTeam) {
  if (winnerTeam && winnerTeam.token === teamItem.token) {
    return 'flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200'
  }

  return 'flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/70 px-3 py-2 text-sm text-slate-200'
}

function getGoalLabel(goalCount) {
  if (goalCount === null) {
    return '—'
  }

  return String(goalCount)
}

function renderPenaltyResult(matchItem) {
  if (
    matchItem.homePenaltyGoals === null ||
    matchItem.awayPenaltyGoals === null
  ) {
    return null
  }

  return (
    <p className="mt-3 text-xs text-slate-400">
      Pênaltis: {matchItem.homePenaltyGoals} x {matchItem.awayPenaltyGoals}
    </p>
  )
}

function renderTeamRow(teamItem, goalCount, winnerTeam) {
  const teamRowClassName = getTeamRowClassName(teamItem, winnerTeam)
  const goalLabel = getGoalLabel(goalCount)

  return (
    <div key={teamItem.token} className={teamRowClassName}>
      <span className="truncate pr-3">{teamItem.nome}</span>
      <span className="font-semibold">{goalLabel}</span>
    </div>
  )
}

function renderKnockoutMatchItem(matchItem) {
  return (
    <article
      key={matchItem.matchLabel}
      className="rounded-xl border border-slate-800 bg-slate-950/40 p-4"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h5 className="text-sm font-semibold text-slate-100">
          {matchItem.matchLabel}
        </h5>

        <span className="text-xs text-slate-500">Eliminatória</span>
      </div>

      <div className="space-y-2">
        {renderTeamRow(matchItem.homeTeam, matchItem.homeGoals, matchItem.winnerTeam)}
        {renderTeamRow(matchItem.awayTeam, matchItem.awayGoals, matchItem.winnerTeam)}
      </div>

      {renderPenaltyResult(matchItem)}
    </article>
  )
}

function renderEmptyStage(stageItem) {
  return (
    <section
      key={stageItem.stageName}
      className="rounded-2xl border border-slate-800/80 bg-slate-950/30 p-4"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-100">
          {stageItem.stageName}
        </h4>

        <span className="text-xs text-slate-500">0 jogos</span>
      </div>

      <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/20 p-4 text-sm text-slate-500">
        Confrontos ainda não definidos.
      </div>
    </section>
  )
}

function renderFilledStage(stageItem) {
  return (
    <section
      key={stageItem.stageName}
      className="rounded-2xl border border-slate-800/80 bg-slate-950/30 p-4"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-100">
          {stageItem.stageName}
        </h4>

        <span className="text-xs text-slate-500">
          {stageItem.matchList.length} jogos
        </span>
      </div>

      <div className="space-y-4">
        {stageItem.matchList.map(renderKnockoutMatchItem)}
      </div>
    </section>
  )
}

function renderKnockoutStageItem(stageItem) {
  if (stageItem.matchList.length === 0) {
    return renderEmptyStage(stageItem)
  }

  return renderFilledStage(stageItem)
}

function createPlaceholderStageList() {
  return [
    { stageName: 'Oitavas', matchList: [] },
    { stageName: 'Quartas', matchList: [] },
    { stageName: 'Semifinal', matchList: [] },
    { stageName: 'Final', matchList: [] },
  ]
}

function KnockoutBracket(props) {
  const { knockoutStageList } = props

  const hasKnockoutStage = knockoutStageList && knockoutStageList.length > 0
  const visibleStageList = hasKnockoutStage
    ? knockoutStageList
    : createPlaceholderStageList()

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">Mata-mata</h3>
          <p className="mt-1 text-sm text-slate-400">
            {hasKnockoutStage
              ? 'O chaveamento foi definido a partir dos classificados da fase de grupos.'
              : 'O chaveamento será exibido após a definição dos classificados.'}
          </p>
        </div>

        <span className="inline-flex w-fit rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-300">
          Oitavas até a final
        </span>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="grid min-w-[980px] gap-4 xl:min-w-0 xl:grid-cols-4">
          {visibleStageList.map(renderKnockoutStageItem)}
        </div>
      </div>
    </section>
  )
}

export default KnockoutBracket