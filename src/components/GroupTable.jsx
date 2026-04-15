function GroupTable() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-100">Classificação do grupo</h3>
        <p className="mt-1 text-sm text-slate-400">
          A tabela será preenchida após a simulação da fase de grupos.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="px-3 py-2">Time</th>
              <th className="px-3 py-2">J</th>
              <th className="px-3 py-2">V</th>
              <th className="px-3 py-2">E</th>
              <th className="px-3 py-2">D</th>
              <th className="px-3 py-2">SG</th>
              <th className="px-3 py-2">Pts</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-800/60">
              <td className="px-3 py-3">Seleção 1</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
            </tr>
            <tr className="border-b border-slate-800/60">
              <td className="px-3 py-3">Seleção 2</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
            </tr>
            <tr className="border-b border-slate-800/60">
              <td className="px-3 py-3">Seleção 3</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
            </tr>
            <tr>
              <td className="px-3 py-3">Seleção 4</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3">0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default GroupTable