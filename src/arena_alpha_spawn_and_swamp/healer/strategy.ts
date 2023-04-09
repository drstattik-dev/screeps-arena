import { state } from 'arena_alpha_spawn_and_swamp/utils/state'
import { Creep } from 'game/prototypes'

export const findBestHealMatch = (): Creep => {
    const possibleTargets = state.attackers

    return possibleTargets.sort((a, b) => a.hits - b.hits)[0]
}
