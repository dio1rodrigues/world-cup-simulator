import ActionPanel from './components/ActionPanel.jsx'
import ChampionCard from './components/ChampionCard.jsx'
import GroupCard from './components/GroupCard.jsx'
import GroupTable from './components/GroupTable.jsx'
import KnockoutBracket from './components/KnockoutBracket.jsx'
import MatchList from './components/MatchList.jsx'
import StatusBanner from './components/StatusBanner.jsx'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/20">
          <h1 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
            Simulador de Copa do Mundo
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
            Acompanhe grupos, partidas, classificação, mata-mata e campeão em uma única interface.
          </p>
        </section>

        <ActionPanel />
        <StatusBanner />

<section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
  <GroupCard
    groupName="Grupo A"
    teamOneName="Seleção 01"
    teamTwoName="Seleção 02"
    teamThreeName="Seleção 03"
    teamFourName="Seleção 04"
  />

  <GroupCard
    groupName="Grupo B"
    teamOneName="Seleção 05"
    teamTwoName="Seleção 06"
    teamThreeName="Seleção 07"
    teamFourName="Seleção 08"
  />

  <GroupCard
    groupName="Grupo C"
    teamOneName="Seleção 09"
    teamTwoName="Seleção 10"
    teamThreeName="Seleção 11"
    teamFourName="Seleção 12"
  />

  <GroupCard
    groupName="Grupo D"
    teamOneName="Seleção 13"
    teamTwoName="Seleção 14"
    teamThreeName="Seleção 15"
    teamFourName="Seleção 16"
  />

  <GroupCard
    groupName="Grupo E"
    teamOneName="Seleção 17"
    teamTwoName="Seleção 18"
    teamThreeName="Seleção 19"
    teamFourName="Seleção 20"
  />

  <GroupCard
    groupName="Grupo F"
    teamOneName="Seleção 21"
    teamTwoName="Seleção 22"
    teamThreeName="Seleção 23"
    teamFourName="Seleção 24"
  />

  <GroupCard
    groupName="Grupo G"
    teamOneName="Seleção 25"
    teamTwoName="Seleção 26"
    teamThreeName="Seleção 27"
    teamFourName="Seleção 28"
  />

  <GroupCard
    groupName="Grupo H"
    teamOneName="Seleção 29"
    teamTwoName="Seleção 30"
    teamThreeName="Seleção 31"
    teamFourName="Seleção 32"
  />
</section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
          <MatchList />
          <GroupTable />
        </section>

        <KnockoutBracket />
        <ChampionCard />
      </main>
    </div>
  )
}

export default App