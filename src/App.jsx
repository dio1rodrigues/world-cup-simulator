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

function OverviewCard(props) {
  const { label, value, helperText } = props

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-slate-50">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{helperText}</p>
    </div>
  )
}

function App() {
  const {
    teamList,
    groupList,
    groupStageScheduleList,
    groupStandingsList,
    knockoutStageList,
    championTeam,
    isLoadingTeams,
    isSendingFinalResult,
    hasSentFinalResult,
    statusMessage,
    statusVariant,
    loadTeams,
    sortGroups,
    generateGroupStageMatches,
    simulateGroupStage,
    generateKnockoutStage,
    simulateKnockoutStage,
    sendFinalResult,
  } = useTournament()

  const hasLoadedTeams = teamList.length > 0
  const hasDrawnGroups = groupList.length > 0
  const hasGeneratedGroupStageMatches = groupStageScheduleList.length > 0
  const hasSimulatedGroupStage = groupStandingsList.length > 0
  const hasGeneratedKnockoutStage = knockoutStageList.length > 0
  const hasSimulatedKnockoutStage = championTeam !== null
  const loadedTeamCount = teamList.length
  const renderGroupCard = createGroupCardRenderer(groupList)

  const groupSectionStatusText = hasDrawnGroups
    ? 'Sorteio concluído'
    : 'Aguardando sorteio'

  const knockoutSectionStatusText = hasSimulatedKnockoutStage
    ? championTeam.nome
    : hasGeneratedKnockoutStage
      ? 'Mata-mata gerado'
      : 'Pendente'

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20 sm:p-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] xl:items-start">
            <div>
              <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-blue-200">
                Simulação completa
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
                Simulador de Copa do Mundo
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
                Acompanhe grupos, partidas, classificação, mata-mata e campeão
                em uma interface única, com etapas organizadas e status visível
                durante toda a simulação.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              <OverviewCard
                label="Seleções"
                value={`${loadedTeamCount}/32`}
                helperText="Carregadas da API para iniciar o torneio."
              />

              <OverviewCard
                label="Grupos"
                value={hasDrawnGroups ? '8/8' : '0/8'}
                helperText="Distribuição das seleções em grupos de quatro."
              />

              <OverviewCard
                label="Status final"
                value={knockoutSectionStatusText}
                helperText="Situação atual do mata-mata e do campeão."
              />
            </div>
          </div>
        </section>

        <ActionPanel
          onLoadTeams={loadTeams}
          onSortGroups={sortGroups}
          onGenerateGroupStageMatches={generateGroupStageMatches}
          onSimulateGroupStage={simulateGroupStage}
          onGenerateKnockoutStage={generateKnockoutStage}
          onSimulateKnockoutStage={simulateKnockoutStage}
          onSendFinalResult={sendFinalResult}
          isLoadingTeams={isLoadingTeams}
          isSendingFinalResult={isSendingFinalResult}
          hasLoadedTeams={hasLoadedTeams}
          hasDrawnGroups={hasDrawnGroups}
          hasGeneratedGroupStageMatches={hasGeneratedGroupStageMatches}
          hasSimulatedGroupStage={hasSimulatedGroupStage}
          hasGeneratedKnockoutStage={hasGeneratedKnockoutStage}
          hasSimulatedKnockoutStage={hasSimulatedKnockoutStage}
          hasSentFinalResult={hasSentFinalResult}
          loadedTeamCount={loadedTeamCount}
        />

        <StatusBanner
          statusMessage={statusMessage}
          statusVariant={statusVariant}
        />

        <ChampionCard championTeam={championTeam} />

        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-50">
                Grupos sorteados
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Visualização das equipes distribuídas entre os grupos A e H.
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-300">
              {groupSectionStatusText}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {groupNameList.map(renderGroupCard)}
          </div>
        </section>

        <MatchList groupStageScheduleList={groupStageScheduleList} />
        <GroupTable groupStandingsList={groupStandingsList} />
        <KnockoutBracket knockoutStageList={knockoutStageList} />
      </main>
    </div>
  )
}

export default App