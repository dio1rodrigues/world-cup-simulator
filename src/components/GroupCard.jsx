function renderPlaceholderTeamListItem(placeholderKey) {
  return (
    <li
      key={placeholderKey}
      className="rounded-xl bg-slate-800/70 px-3 py-2 text-slate-500"
    >
      Aguardando sorteio
    </li>
  )
}

function renderTeamListItem(teamItem) {
  return (
    <li
      key={teamItem.token}
      className="rounded-xl bg-slate-800/70 px-3 py-2"
    >
      {teamItem.nome}
    </li>
  )
}

function GroupCard(props) {
  const { groupName, teamList } = props

  const hasTeams = teamList.length > 0

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-100">{groupName}</h3>
      </header>

      <ul className="space-y-3 text-sm text-slate-300">
        {hasTeams ? (
          teamList.map(renderTeamListItem)
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