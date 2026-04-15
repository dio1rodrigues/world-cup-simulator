function GroupCard(props) {
  const {
    groupName,
    teamOneName,
    teamTwoName,
    teamThreeName,
    teamFourName,
  } = props

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-100">{groupName}</h3>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
          4 seleções
        </span>
      </header>

      <ul className="space-y-3 text-sm text-slate-300">
        <li className="rounded-xl bg-slate-800/70 px-3 py-2">{teamOneName}</li>
        <li className="rounded-xl bg-slate-800/70 px-3 py-2">{teamTwoName}</li>
        <li className="rounded-xl bg-slate-800/70 px-3 py-2">{teamThreeName}</li>
        <li className="rounded-xl bg-slate-800/70 px-3 py-2">{teamFourName}</li>
      </ul>
    </article>
  )
}

export default GroupCard