import { MaxNumberCreep, Role } from 'arena_alpha_spawn_and_swamp/constants/enums'
import { getSpawn } from 'arena_alpha_spawn_and_swamp/utils/getters'
import { state } from 'arena_alpha_spawn_and_swamp/utils/state'
import { healerTemplate } from 'arena_alpha_spawn_and_swamp/utils/templates'
import { ERR_NOT_IN_RANGE } from 'game/constants'
import { Creep } from 'game/prototypes'
import { findBestHealMatch } from './strategy'

const spawn = getSpawn()

export const spawnHealer = () => {
    if (state.healers.length < MaxNumberCreep.HEALER) {
        if (!spawn.spawning) {
            const newCreep: Creep | undefined = spawn.spawnCreep(healerTemplate).object
            if (newCreep) {
                newCreep.role = Role.Healer
                state.healers.push(newCreep)
            }
        }
    } else {
        state.healers = state.healers.filter(creep => creep.exists)
    }
}

export const heal = () => {
    state.healers.forEach(healer => {
        const bestMatch = findBestHealMatch()

        if (bestMatch && bestMatch.hits !== bestMatch.hitsMax) {
            if (healer.heal(bestMatch) === ERR_NOT_IN_RANGE) {
                healer.moveTo(bestMatch)
            }
        } else {
            healer.moveTo(bestMatch)
        }
    })
}
