function KnockoutBracket() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-100">Mata-mata</h3>
        <p className="mt-1 text-sm text-slate-400">
          O chaveamento será exibido após a definição dos classificados.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-slate-800/70 p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-200">Oitavas</h4>
          <p className="text-sm text-slate-400">Confrontos ainda não definidos.</p>
        </div>

        <div className="rounded-xl bg-slate-800/70 p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-200">Quartas</h4>
          <p className="text-sm text-slate-400">Confrontos ainda não definidos.</p>
        </div>

        <div className="rounded-xl bg-slate-800/70 p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-200">Semifinal</h4>
          <p className="text-sm text-slate-400">Confrontos ainda não definidos.</p>
        </div>

        <div className="rounded-xl bg-slate-800/70 p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-200">Final</h4>
          <p className="text-sm text-slate-400">Confronto ainda não definido.</p>
        </div>
      </div>
    </section>
  )
}

export default KnockoutBracket