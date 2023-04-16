import { state } from 'arena_alpha_spawn_and_swamp/utils/state'
import { Creep } from 'game/prototypes'

export const findBestHealMatch = (healer: Creep): Creep => {
    const probableTargets = [...state.attackers, ...state.rangedAttackers].mutationFilter(creep => creep.exists)
    probableTargets.sort((a, b) => a.hits - b.hits)

    if (healer.hits < healer.hitsMax) {
        return healer
    } else {
        return probableTargets[0]
    }
}
