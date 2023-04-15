import { MaxNumberCreep, Role } from 'arena_alpha_spawn_and_swamp/constants/enums'
import { getSpawn } from 'arena_alpha_spawn_and_swamp/utils/getters'
import { state } from 'arena_alpha_spawn_and_swamp/utils/state'
import { attackerTemplate } from 'arena_alpha_spawn_and_swamp/utils/templates'
import { ERR_NOT_IN_RANGE } from 'game/constants'
import { Creep, StructureSpawn, StructureTower } from 'game/prototypes'
import { findBestMatch, findBestMatchForReinforcements } from './strategy'

const spawn = getSpawn()

let reinforcement = false

export const getEffectiveAttackers = () => {
    return state.attackers.filter(attacker => !attacker.isSpawning() && attacker.id !== undefined)
}

const squad: () => boolean = () => {
    if (getEffectiveAttackers().length === MaxNumberCreep.ATTACKER) {
        return true
    } else {
        state.attackers.forEach(attacker => {
            const xDirection = getSpawn().x === 5 ? 4 : -4
            attacker.moveTo({ x: getSpawn().x + xDirection, y: getSpawn().y })
        })
        return false
    }
}

export const spawnAttacker = () => {
    if (getEffectiveAttackers().length < MaxNumberCreep.ATTACKER || reinforcement) {
        if (!spawn.spawning) {
            const newCreep: Creep | undefined = spawn.spawnCreep(attackerTemplate).object
            if (newCreep) {
                newCreep.role = reinforcement ? Role.Reinforcement : Role.Attacker
                state.attackers.push(newCreep)
            }
        }
    } else {
        state.attackers.mutationFilter(creep => creep.exists)
        reinforcement = true
    }
}

const squadAttack = (attacker: Creep, bestMatch: StructureSpawn | Creep | StructureTower) => {
    if (attacker.attack(bestMatch) === ERR_NOT_IN_RANGE) {
        attacker.moveTo(bestMatch)
    }
    if (attacker.rangedAttack(bestMatch) === ERR_NOT_IN_RANGE) {
        attacker.moveTo(bestMatch)
    }
}

export const attack = () => {
    if (!squad() && !reinforcement) return

    const bestMatch = findBestMatch()
    const bestMatchForReinforcements = findBestMatchForReinforcements()
    state.attackers.forEach(attacker => {
        if (attacker.role !== Role.Reinforcement) {
            squadAttack(attacker, bestMatch)
        } else {
            squadAttack(attacker, bestMatchForReinforcements)
        }
    })
}
