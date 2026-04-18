function renderStandingRowItem(standingRow) {
  return (
    <tr
      key={standingRow.teamToken}
      className={standingRow.isQualified ? 'bg-emerald-500/5' : ''}
    >
      <td className="truncate px-3 py-3 text-slate-200">{standingRow.teamName}</td>
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
      <h4 className="mb-4 text-base font-semibold text-slate-100">
        {groupStandingsItem.groupName}
      </h4>

      <div className="overflow-x-auto">
        <table className="min-w-[640px] w-full table-fixed text-left text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="w-[40%] px-3 py-2">Time</th>
              <th className="w-[10%] px-3 py-2 text-center">J</th>
              <th className="w-[10%] px-3 py-2 text-center">V</th>
              <th className="w-[10%] px-3 py-2 text-center">E</th>
              <th className="w-[10%] px-3 py-2 text-center">D</th>
              <th className="w-[10%] px-3 py-2 text-center">SG</th>
              <th className="w-[10%] px-3 py-2 text-center">Pts</th>
            </tr>
          </thead>
          <tbody>
            {groupStandingsItem.standingsList.map(renderStandingRowItem)}
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

        <div className="rounded-xl bg-slate-800/40 p-4 text-sm text-slate-400">
          A classificação ainda não foi calculada.
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-100">
          Tabela de classificação
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Os dois primeiros colocados de cada grupo estão destacados.
        </p>
      </div>

      <div className="space-y-5">
        {groupStandingsList.map(renderGroupStandingsItem)}
      </div>
    </section>
  )
}

export default GroupTable