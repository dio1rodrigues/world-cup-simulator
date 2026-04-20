import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  calculateGroupStandingsList,
  drawGroups,
  findChampionTeam,
  generateGroupStageScheduleList,
  generateKnockoutStageList,
  simulateKnockoutMatch,
  simulateKnockoutStageList,
  sortStandingRowList,
} from '../features/tournament/engine.js'

function createTeam(index) {
  return {
    token: `token-${index}`,
    nome: `Seleção ${index}`,
  }
}

function createTeamList() {
  return Array.from({ length: 32 }, function createItem(_, index) {
    return createTeam(index + 1)
  })
}

function createManualGroupSchedule() {
  const teamA = createTeam(1)
  const teamB = createTeam(2)
  const teamC = createTeam(3)
  const teamD = createTeam(4)

  return [
    {
      groupName: 'Grupo A',
      roundList: [
        {
          groupName: 'Grupo A',
          roundNumber: 1,
          matchList: [
            {
              groupName: 'Grupo A',
              roundNumber: 1,
              homeTeam: teamA,
              awayTeam: teamB,
              homeGoals: 2,
              awayGoals: 0,
            },
            {
              groupName: 'Grupo A',
              roundNumber: 1,
              homeTeam: teamC,
              awayTeam: teamD,
              homeGoals: 1,
              awayGoals: 1,
            },
          ],
        },
        {
          groupName: 'Grupo A',
          roundNumber: 2,
          matchList: [
            {
              groupName: 'Grupo A',
              roundNumber: 2,
              homeTeam: teamA,
              awayTeam: teamC,
              homeGoals: 1,
              awayGoals: 0,
            },
            {
              groupName: 'Grupo A',
              roundNumber: 2,
              homeTeam: teamB,
              awayTeam: teamD,
              homeGoals: 0,
              awayGoals: 0,
            },
          ],
        },
        {
          groupName: 'Grupo A',
          roundNumber: 3,
          matchList: [
            {
              groupName: 'Grupo A',
              roundNumber: 3,
              homeTeam: teamA,
              awayTeam: teamD,
              homeGoals: 1,
              awayGoals: 1,
            },
            {
              groupName: 'Grupo A',
              roundNumber: 3,
              homeTeam: teamB,
              awayTeam: teamC,
              homeGoals: 2,
              awayGoals: 0,
            },
          ],
        },
      ],
    },
  ]
}

function createGroupStandingsFixture() {
  return [
    {
      groupName: 'Grupo A',
      standingsList: [
        { teamToken: 'A1', teamName: 'A1' },
        { teamToken: 'A2', teamName: 'A2' },
      ],
    },
    {
      groupName: 'Grupo B',
      standingsList: [
        { teamToken: 'B1', teamName: 'B1' },
        { teamToken: 'B2', teamName: 'B2' },
      ],
    },
    {
      groupName: 'Grupo C',
      standingsList: [
        { teamToken: 'C1', teamName: 'C1' },
        { teamToken: 'C2', teamName: 'C2' },
      ],
    },
    {
      groupName: 'Grupo D',
      standingsList: [
        { teamToken: 'D1', teamName: 'D1' },
        { teamToken: 'D2', teamName: 'D2' },
      ],
    },
    {
      groupName: 'Grupo E',
      standingsList: [
        { teamToken: 'E1', teamName: 'E1' },
        { teamToken: 'E2', teamName: 'E2' },
      ],
    },
    {
      groupName: 'Grupo F',
      standingsList: [
        { teamToken: 'F1', teamName: 'F1' },
        { teamToken: 'F2', teamName: 'F2' },
      ],
    },
    {
      groupName: 'Grupo G',
      standingsList: [
        { teamToken: 'G1', teamName: 'G1' },
        { teamToken: 'G2', teamName: 'G2' },
      ],
    },
    {
      groupName: 'Grupo H',
      standingsList: [
        { teamToken: 'H1', teamName: 'H1' },
        { teamToken: 'H2', teamName: 'H2' },
      ],
    },
  ]
}

function createRepeatedRandomSequence(sequencePattern, repetitionCount) {
  const repeatedSequence = []

  for (
    let repetitionIndex = 0;
    repetitionIndex < repetitionCount;
    repetitionIndex += 1
  ) {
    for (const sequenceValue of sequencePattern) {
      repeatedSequence.push(sequenceValue)
    }
  }

  return repeatedSequence
}

afterEach(function restoreMocks() {
  vi.restoreAllMocks()
})

describe('drawGroups', function describeDrawGroups() {
  it('distributes 32 teams into 8 groups of 4', function testGroupDistribution() {
    const groupList = drawGroups(createTeamList())

    expect(groupList).toHaveLength(8)
    expect(
      groupList.every(function checkGroupSize(groupItem) {
        return groupItem.teamList.length === 4
      }),
    ).toBe(true)

    const allTokens = groupList.flatMap(function mapGroupTokens(groupItem) {
      return groupItem.teamList.map(function mapTeamToken(teamItem) {
        return teamItem.token
      })
    })

    expect(new Set(allTokens).size).toBe(32)
  })

  it('throws an error when the tournament does not have 32 teams', function testInvalidTeamCount() {
    const invalidTeamList = createTeamList().slice(0, 31)

    expect(function callDrawGroups() {
      drawGroups(invalidTeamList)
    }).toThrow('O torneio precisa de 32 seleções para o sorteio.')
  })
})

describe('generateGroupStageScheduleList', function describeScheduleGeneration() {
  it('creates 3 rounds and 6 unique pairings for a group', function testRoundGeneration() {
    const groupList = [
      {
        groupName: 'Grupo A',
        teamList: [createTeam(1), createTeam(2), createTeam(3), createTeam(4)],
      },
    ]

    const groupStageScheduleList = generateGroupStageScheduleList(groupList)
    const roundList = groupStageScheduleList[0].roundList

    expect(roundList).toHaveLength(3)
    expect(
      roundList.every(function checkRoundMatchCount(roundItem) {
        return roundItem.matchList.length === 2
      }),
    ).toBe(true)

    const pairingSet = new Set()

    for (const roundItem of roundList) {
      for (const matchItem of roundItem.matchList) {
        const sortedPair = [
          matchItem.homeTeam.token,
          matchItem.awayTeam.token,
        ]
          .sort()
          .join('-')

        pairingSet.add(sortedPair)
      }
    }

    expect(pairingSet.size).toBe(6)
  })
})

describe('calculateGroupStandingsList', function describeGroupStandings() {
  it('counts points and classifies the top two teams', function testStandingsCalculation() {
    const groupStandingsList = calculateGroupStandingsList(
      createManualGroupSchedule(),
    )
    const standingsList = groupStandingsList[0].standingsList

    expect(standingsList[0].teamName).toBe('Seleção 1')
    expect(standingsList[0].points).toBe(7)

    expect(standingsList[1].teamName).toBe('Seleção 2')
    expect(standingsList[1].points).toBe(4)

    expect(standingsList[0].isQualified).toBe(true)
    expect(standingsList[1].isQualified).toBe(true)
    expect(standingsList[2].isQualified).toBe(false)
  })
})

describe('sortStandingRowList', function describeStandingSort() {
  it('uses points, goal difference and stable draw tie breaker', function testStandingSort() {
    const standingRowList = [
      {
        teamToken: 'A',
        points: 6,
        goalDifference: 2,
        drawTieBreakerValue: 0.9,
      },
      {
        teamToken: 'B',
        points: 6,
        goalDifference: 2,
        drawTieBreakerValue: 0.2,
      },
      {
        teamToken: 'C',
        points: 5,
        goalDifference: 10,
        drawTieBreakerValue: 0.5,
      },
    ]

    const sortedStandingRowList = sortStandingRowList(standingRowList)

    expect(
      sortedStandingRowList.map(function mapStandingToken(standingRow) {
        return standingRow.teamToken
      }),
    ).toEqual(['A', 'B', 'C'])
  })
})

describe('generateKnockoutStageList', function describeKnockoutGeneration() {
  it('creates the round of 16 bracket from group standings', function testRoundOf16Generation() {
    const knockoutStageList = generateKnockoutStageList(
      createGroupStandingsFixture(),
    )

    expect(knockoutStageList).toHaveLength(4)
    expect(knockoutStageList[0].stageName).toBe('Oitavas')
    expect(knockoutStageList[0].matchList).toHaveLength(8)
    expect(knockoutStageList[0].matchList[0].homeTeam.token).toBe('A1')
    expect(knockoutStageList[0].matchList[0].awayTeam.token).toBe('B2')
  })
})

describe('simulateKnockoutMatch', function describeKnockoutMatchSimulation() {
  it('uses penalties when the match ends in a draw', function testPenaltyDecision() {
    const randomSequence = [0, 0, 0, 0.2]

    vi.spyOn(Math, 'random').mockImplementation(function mockRandom() {
      return randomSequence.shift() ?? 0.2
    })

    const simulatedMatch = simulateKnockoutMatch({
      stageName: 'Final',
      matchLabel: 'Final 1',
      homeTeam: { token: 'A', nome: 'Time A' },
      awayTeam: { token: 'B', nome: 'Time B' },
      homeGoals: null,
      awayGoals: null,
      homePenaltyGoals: null,
      awayPenaltyGoals: null,
      winnerTeam: null,
    })

    expect(simulatedMatch.homeGoals).toBe(0)
    expect(simulatedMatch.awayGoals).toBe(0)
    expect(simulatedMatch.homePenaltyGoals).toBe(3)
    expect(simulatedMatch.awayPenaltyGoals).toBe(4)
    expect(simulatedMatch.winnerTeam.token).toBe('B')
  })
})

describe('simulateKnockoutStageList', function describeKnockoutProgression() {
  it('progresses through all knockout stages and defines a champion', function testKnockoutProgression() {
    const randomSequence = createRepeatedRandomSequence([0, 0, 0, 0.2], 15)

    vi.spyOn(Math, 'random').mockImplementation(function mockRandom() {
      return randomSequence.shift() ?? 0.2
    })

    const baseKnockoutStageList = generateKnockoutStageList(
      createGroupStandingsFixture(),
    )

    const simulatedKnockoutStageList =
      simulateKnockoutStageList(baseKnockoutStageList)

    expect(simulatedKnockoutStageList[0].matchList).toHaveLength(8)
    expect(simulatedKnockoutStageList[1].matchList).toHaveLength(4)
    expect(simulatedKnockoutStageList[2].matchList).toHaveLength(2)
    expect(simulatedKnockoutStageList[3].matchList).toHaveLength(1)

    const championTeam = findChampionTeam(simulatedKnockoutStageList)

    expect(championTeam).not.toBeNull()
    expect(typeof championTeam.nome).toBe('string')
  })
})