function ChampionCard(props) {
  const { championTeam } = props

  if (!championTeam) {
    return (
      <section className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-amber-100">Campeão</h3>
          <p className="mt-1 text-sm text-amber-200/80">
            O campeão será exibido ao final da simulação.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-sm text-amber-100">
          Nenhuma seleção campeã definida até o momento.
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-emerald-100">Campeão</h3>
        <p className="mt-1 text-sm text-emerald-200/80">
          O campeão da simulação foi definido com sucesso.
        </p>
      </div>

      <div className="rounded-xl border border-emerald-500/20 bg-slate-950/40 p-5">
        <p className="text-sm text-emerald-200">Seleção campeã</p>
        <p className="mt-2 text-2xl font-bold text-emerald-100">
          {championTeam.nome}
        </p>
      </div>
    </section>
  )
}

export default ChampionCard