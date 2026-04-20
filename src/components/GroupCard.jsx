function renderPlaceholderTeamListItem(placeholderKey) {
  return (
    <li
      key={placeholderKey}
      className="flex items-center gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/40 px-3 py-3 text-sm text-slate-500"
    >
      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-700 text-xs">
        —
      </span>
      <span>Aguardando sorteio</span>
    </li>
  )
}

function renderTeamListItem(teamItem, teamIndex) {
  return (
    <li
      key={teamItem.token}
      className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/70 px-3 py-3 text-sm text-slate-200"
    >
      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-slate-300">
        {teamIndex + 1}
      </span>

      <span className="truncate">{teamItem.nome}</span>
    </li>
  )
}

function GroupCard(props) {
  const { groupName, teamList } = props

  const hasTeams = teamList.length > 0
  const teamCountLabel = `${teamList.length}/4`

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">{groupName}</h3>
          <p className="mt-1 text-sm text-slate-400">
            {hasTeams
              ? 'Seleções definidas para a fase de grupos.'
              : 'Aguardando a definição das equipes.'}
          </p>
        </div>

        <span className="inline-flex rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-300">
          {teamCountLabel}
        </span>
      </header>

      <ul className="space-y-3">
        {hasTeams ? (
          teamList.map(function renderCurrentTeam(teamItem, teamIndex) {
            return renderTeamListItem(teamItem, teamIndex)
          })
        ) : (
          <>
            {renderPlaceholderTeamListItem('placeholder-1')}
            {renderPlaceholderTeamListItem('placeholder-2')}
            {renderPlaceholderTeamListItem('placeholder-3')}
            {renderPlaceholderTeamListItem('placeholder-4')}
          </>
        )}
      </ul>
    </article>
  )
}

export default GroupCard