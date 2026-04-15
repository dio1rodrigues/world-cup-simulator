function ChampionCard() {
  return (
    <section className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-yellow-100">Campeão</h3>
        <p className="mt-1 text-sm text-yellow-200/80">
          O campeão será exibido ao final da simulação.
        </p>
      </div>

      <div className="rounded-xl bg-slate-950/40 p-4">
        <p className="text-sm text-yellow-100">Nenhuma seleção campeã definida até o momento.</p>
      </div>
    </section>
  )
}

export default ChampionCard