function getStandingRowClassName(standingRow) {
  if (standingRow.isQualified) {
    return 'border-b border-slate-800/80 bg-emerald-500/5'
  }

  return 'border-b border-slate-800/80'
}

function renderQualificationBadge(isQualified) {
  if (!isQualified) {
    return null
  }

  return (
    <span className="ml-2 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-200">
      Classificado
    </span>
  )
}

function renderStandingRowItem(standingRow, standingIndex) {
  return (
    <tr
      key={standingRow.teamToken}
      className={getStandingRowClassName(standingRow)}
    >
      <td className="px-3 py-3 text-center text-slate-400">
        {standingIndex + 1}
      </td>

      <td className="px-3 py-3 text-slate-200">
        <div className="flex items-center">
          <span className="truncate">{standingRow.teamName}</span>
          {renderQualificationBadge(standingRow.isQualified)}
        </div>
      </td>

      <td className="px-3 py-3 text-center">{standingRow.playedMatchCount}</td>
      <td className="px-3 py-3 text-center">{standingRow.winCount}</td>
      <td className="px-3 py-3 text-center">{standingRow.drawCount}</td>
      <td className="px-3 py-3 text-center">{standingRow.lossCount}</td>
      <td className="px-3 py-3 text-center">{standingRow.goalDifference}</td>
      <td className="px-3 py-3 text-center font-semibold text-slate-100">
        {standingRow.points}
      </td>
    </tr>
  )
}

function renderGroupStandingsItem(groupStandingsItem) {
  return (
    <article
      key={groupStandingsItem.groupName}
      className="rounded-2xl border border-slate-800/80 bg-slate-950/30 p-4"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-100">
          {groupStandingsItem.groupName}
        </h4>

        <span className="inline-flex rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-300">
          2 classificados
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[720px] w-full table-fixed text-left text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="w-[8%] px-3 py-2 text-center">Pos</th>
              <th className="w-[36%] px-3 py-2">Seleção</th>
              <th className="w-[8%] px-3 py-2 text-center">J</th>
              <th className="w-[8%] px-3 py-2 text-center">V</th>
              <th className="w-[8%] px-3 py-2 text-center">E</th>
              <th className="w-[8%] px-3 py-2 text-center">D</th>
              <th className="w-[12%] px-3 py-2 text-center">SG</th>
              <th className="w-[12%] px-3 py-2 text-center">Pts</th>
            </tr>
          </thead>

          <tbody>
            {groupStandingsItem.standingsList.map(function renderStandingRow(
              standingRow,
              standingIndex,
            ) {
              return renderStandingRowItem(standingRow, standingIndex)
            })}
          </tbody>
        </table>
      </div>
    </article>
  )
}

function GroupTable(props) {
  const { groupStandingsList } = props

  if (!groupStandingsList || groupStandingsList.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-100">
            Tabela de classificação
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            A tabela será preenchida após a simulação da fase de grupos.
          </p>
        </div>

        <div className="rounded-xl border border-dashed border-slate-800 bg-slate-800/20 p-4 text-sm text-slate-400">
          A classificação ainda não foi calculada.
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">
            Tabela de classificação
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Os dois primeiros colocados de cada grupo estão destacados.
          </p>
        </div>

        <span className="inline-flex w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
          Critérios: pontos, saldo e sorteio
        </span>
      </div>

      <div className="space-y-5">
        {groupStandingsList.map(renderGroupStandingsItem)}
      </div>
    </section>
  )
}

export default GroupTable