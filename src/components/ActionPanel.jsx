function ActionPanel() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-100">Painel de ações</h2>
        <p className="mt-1 text-sm text-slate-400">
          Esta área vai controlar o fluxo principal da simulação.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          Carregar seleções
        </button>

        <button
          type="button"
          className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
        >
          Sortear grupos
        </button>

        <button
          type="button"
          className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
        >
          Simular fase de grupos
        </button>

        <button
          type="button"
          className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
        >
          Gerar mata-mata
        </button>

        <button
          type="button"
          className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
        >
          Simular fases finais
        </button>

        <button
          type="button"
          className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
        >
          Enviar resultado final
        </button>
      </div>
    </section>
  )
}

export default ActionPanel