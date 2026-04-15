function MatchList() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-100">Partidas da fase de grupos</h3>
        <p className="mt-1 text-sm text-slate-400">
          Os confrontos serão exibidos aqui por grupo e por rodada.
        </p>
      </div>

      <div className="space-y-3">
        <div className="rounded-xl bg-slate-800/70 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            Rodada 1
          </p>
          <div className="flex items-center justify-between gap-4 text-sm text-slate-200">
            <span>Seleção 1</span>
            <span className="rounded-lg bg-slate-950 px-3 py-1 font-semibold">0 x 0</span>
            <span>Seleção 2</span>
          </div>
        </div>

        <div className="rounded-xl bg-slate-800/70 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            Rodada 1
          </p>
          <div className="flex items-center justify-between gap-4 text-sm text-slate-200">
            <span>Seleção 3</span>
            <span className="rounded-lg bg-slate-950 px-3 py-1 font-semibold">0 x 0</span>
            <span>Seleção 4</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MatchList