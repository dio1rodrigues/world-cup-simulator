import { describe, expect, it } from 'vitest'
import {
  buildFinalResultPayload,
  findFinalMatch,
} from '../features/tournament/finalResult.js'

describe('findFinalMatch', function describeFindFinalMatch() {
  it('returns the final match when it exists', function testFindFinalMatch() {
    const finalMatch = {
      stageName: 'Final',
      matchLabel: 'Final 1',
      homeTeam: { token: 'A', nome: 'Time A' },
      awayTeam: { token: 'B', nome: 'Time B' },
      homeGoals: 2,
      awayGoals: 1,
      homePenaltyGoals: null,
      awayPenaltyGoals: null,
      winnerTeam: { token: 'A', nome: 'Time A' },
    }

    const knockoutStageList = [
      { stageName: 'Oitavas', matchList: [] },
      { stageName: 'Quartas', matchList: [] },
      { stageName: 'Semifinal', matchList: [] },
      { stageName: 'Final', matchList: [finalMatch] },
    ]

    expect(findFinalMatch(knockoutStageList)).toEqual(finalMatch)
  })

  it('returns null when the final stage does not have a match', function testFinalMatchNotFound() {
    const knockoutStageList = [
      { stageName: 'Oitavas', matchList: [] },
      { stageName: 'Quartas', matchList: [] },
      { stageName: 'Semifinal', matchList: [] },
      { stageName: 'Final', matchList: [] },
    ]

    expect(findFinalMatch(knockoutStageList)).toBeNull()
  })
})

describe('buildFinalResultPayload', function describeBuildFinalResultPayload() {
  it('builds the final payload with zero penalties when there is no shootout', function testPayloadWithoutPenalties() {
    const payload = buildFinalResultPayload({
      homeTeam: { token: 'A', nome: 'Time A' },
      awayTeam: { token: 'B', nome: 'Time B' },
      homeGoals: 2,
      awayGoals: 1,
      homePenaltyGoals: null,
      awayPenaltyGoals: null,
    })

    expect(payload).toEqual({
      equipeA: 'A',
      equipeB: 'B',
      golsEquipeA: 2,
      golsEquipeB: 1,
      golsPenaltyTimeA: 0,
      golsPenaltyTimeB: 0,
    })
  })

  it('preserves penalty goals when the final is decided on penalties', function testPayloadWithPenalties() {
    const payload = buildFinalResultPayload({
      homeTeam: { token: 'A', nome: 'Time A' },
      awayTeam: { token: 'B', nome: 'Time B' },
      homeGoals: 1,
      awayGoals: 1,
      homePenaltyGoals: 4,
      awayPenaltyGoals: 3,
    })

    expect(payload).toEqual({
      equipeA: 'A',
      equipeB: 'B',
      golsEquipeA: 1,
      golsEquipeB: 1,
      golsPenaltyTimeA: 4,
      golsPenaltyTimeB: 3,
    })
  })

  it('throws an error when the final match is missing', function testMissingFinalMatch() {
    expect(function callBuildFinalResultPayload() {
      buildFinalResultPayload(null)
    }).toThrow('Não foi possível localizar a partida final.')
  })
})