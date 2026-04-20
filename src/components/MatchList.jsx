function getMatchScoreLabel(homeGoals, awayGoals) {
  if (homeGoals === null || awayGoals === null) {
    return '— x —'
  }

  return `${homeGoals} x ${awayGoals}`
}

function getGroupSummaryText(groupStageScheduleItem) {
  const roundCount = groupStageScheduleItem.roundList.length
  let totalMatchCount = 0

  for (const roundItem of groupStageScheduleItem.roundList) {
    totalMatchCount += roundItem.matchList.length
  }

  return `${roundCount} rodadas • ${totalMatchCount} partidas`
}

function renderGroupStageMatchItem(matchItem) {
  const matchScoreLabel = getMatchScoreLabel(
    matchItem.homeGoals,
    matchItem.awayGoals,
  )

  return (
    <div
      key={`${matchItem.groupName}-${matchItem.roundNumber}-${matchItem.homeTeam.token}-${matchItem.awayTeam.token}`}
      className="rounded-xl bg-slate-800/70 px-4 py-3"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)] items-center gap-3 text-sm text-slate-200">
        <span className="truncate pr-2 text-left">{matchItem.homeTeam.nome}</span>

        <span className="rounded-lg bg-slate-950 px-3 py-1 text-center text-xs font-semibold sm:text-sm">
          {matchScoreLabel}
        </span>

        <span className="truncate pl-2 text-right">{matchItem.awayTeam.nome}</span>
      </div>
    </div>
  )
}

function renderGroupStageRoundItem(roundItem) {
  return (
    <section
      key={`${roundItem.groupName}-rodada-${roundItem.roundNumber}`}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-semibold text-slate-200">
          Rodada {roundItem.roundNumber}
        </h5>
        <span className="text-xs text-slate-500">
          {roundItem.matchList.length} partidas
        </span>
      </div>

      <div className="space-y-3">
        {roundItem.matchList.map(renderGroupStageMatchItem)}
      </div>
    </section>
  )
}

function renderGroupStageScheduleItem(groupStageScheduleItem) {
  const groupSummaryText = getGroupSummaryText(groupStageScheduleItem)

  return (
    <details
      key={groupStageScheduleItem.groupName}
      className="group rounded-2xl border border-slate-800/80 bg-slate-950/30 open:bg-slate-950/40"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4">
        <div>
          <h4 className="text-base font-semibold text-slate-100">
            {groupStageScheduleItem.groupName}
          </h4>
          <p className="mt-1 text-xs text-slate-400">{groupSummaryText}</p>
        </div>

        <span className="text-xs font-medium text-slate-400 transition group-open:rotate-180">
          ▼
        </span>
      </summary>

      <div className="border-t border-slate-800/80 px-4 py-4">
        <div className="space-y-5">
          {groupStageScheduleItem.roundList.map(renderGroupStageRoundItem)}
        </div>
      </div>
    </details>
  )
}

function MatchList(props) {
  const { groupStageScheduleList } = props

  if (groupStageScheduleList.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-100">
            Partidas da fase de grupos
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            As partidas serão exibidas aqui por grupo e por rodada.
          </p>
        </div>

        <div className="rounded-xl bg-slate-800/40 p-4 text-sm text-slate-400">
          As partidas ainda não foram geradas.
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-100">
          Partidas da fase de grupos
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Abra cada grupo para visualizar as rodadas e os confrontos.
        </p>
      </div>

      <div className="space-y-4">
        {groupStageScheduleList.map(renderGroupStageScheduleItem)}
      </div>
    </section>
  )
}

export default MatchList