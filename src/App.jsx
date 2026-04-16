import ActionPanel from './components/ActionPanel.jsx'
import ChampionCard from './components/ChampionCard.jsx'
import GroupCard from './components/GroupCard.jsx'
import GroupTable from './components/GroupTable.jsx'
import KnockoutBracket from './components/KnockoutBracket.jsx'
import MatchList from './components/MatchList.jsx'
import StatusBanner from './components/StatusBanner.jsx'
import useTournament from './features/tournament/useTournament.js'

const groupNameList = [
  'Grupo A',
  'Grupo B',
  'Grupo C',
  'Grupo D',
  'Grupo E',
  'Grupo F',
  'Grupo G',
  'Grupo H',
]

function findGroupByName(groupList, groupName) {
  for (const groupItem of groupList) {
    if (groupItem.groupName === groupName) {
      return groupItem
    }
  }

  return null
}

function createGroupCardRenderer(groupList) {
  function renderGroupCard(groupName) {
    const currentGroup = findGroupByName(groupList, groupName)
    const currentTeamList = currentGroup ? currentGroup.teamList : []

    return (
      <GroupCard
        key={groupName}
        groupName={groupName}
        teamList={currentTeamList}
      />
    )
  }

  return renderGroupCard
}

function App() {
  const {
    teamList,
    groupList,
    groupStageScheduleList,
    isLoadingTeams,
    statusMessage,
    statusVariant,
    loadTeams,
    sortGroups,
    generateGroupStageMatches,
  } = useTournament()

  const hasLoadedTeams = teamList.length > 0
  const hasDrawnGroups = groupList.length > 0
  const hasGeneratedGroupStageMatches = groupStageScheduleList.length > 0
  const loadedTeamCount = teamList.length
  const renderGroupCard = createGroupCardRenderer(groupList)

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

        <ActionPanel
          onLoadTeams={loadTeams}
          onSortGroups={sortGroups}
          onGenerateGroupStageMatches={generateGroupStageMatches}
          isLoadingTeams={isLoadingTeams}
          hasLoadedTeams={hasLoadedTeams}
          hasDrawnGroups={hasDrawnGroups}
          hasGeneratedGroupStageMatches={hasGeneratedGroupStageMatches}
          loadedTeamCount={loadedTeamCount}
        />

        <StatusBanner
          statusMessage={statusMessage}
          statusVariant={statusVariant}
        />

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {groupNameList.map(renderGroupCard)}
        </section>

        <MatchList groupStageScheduleList={groupStageScheduleList} />
        <GroupTable />

        <KnockoutBracket />
        <ChampionCard />
      </main>
    </div>
  )
}

export default App