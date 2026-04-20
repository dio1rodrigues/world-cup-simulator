function ChampionCard(props) {
  const { championTeam } = props

  if (!championTeam) {
    return (
      <section className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-amber-500/20 bg-amber-500/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-amber-200">
              Campeão
            </span>

            <h2 className="mt-3 text-xl font-semibold text-amber-100">
              Campeão ainda não definido
            </h2>

            <p className="mt-1 text-sm text-amber-200/80">
              O campeão será exibido aqui após a simulação completa do
              mata-mata.
            </p>
          </div>

          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 px-5 py-6 text-center text-sm text-slate-400 lg:min-w-[280px]">
            Nenhuma seleção campeã definida até o momento.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-emerald-200">
            Campeão definido
          </span>

          <h2 className="mt-3 text-xl font-semibold text-emerald-100">
            Resultado final da simulação
          </h2>

          <p className="mt-1 text-sm text-emerald-200/80">
            A seleção campeã foi determinada após a conclusão das fases finais.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-slate-950/40 px-6 py-6 text-center lg:min-w-[320px]">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-300">
            Seleção campeã
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-emerald-100">
            {championTeam.nome}
          </p>
        </div>
      </div>
    </section>
  )
}

export default ChampionCard