import { MaxNumberCreep, Role } from 'arena_alpha_spawn_and_swamp/constants/enums'
import { getSpawn } from 'arena_alpha_spawn_and_swamp/utils/getters'
import { state } from 'arena_alpha_spawn_and_swamp/utils/state'
import { attackerTemplate } from 'arena_alpha_spawn_and_swamp/utils/templates'
import { ERR_NOT_IN_RANGE } from 'game/constants'
import { Creep } from 'game/prototypes'
import { findBestMatch } from './strategy'

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
    if (getEffectiveAttackers().length < MaxNumberCreep.ATTACKER) {
        if (!spawn.spawning) {
            const newCreep: Creep | undefined = spawn.spawnCreep(attackerTemplate).object
            if (newCreep) {
                newCreep.role = Role.Attacker
                state.attackers.push(newCreep)
            }
        }
    } else {
        state.attackers = state.attackers.filter(creep => creep.exists)
        reinforcement = true
    }
}

export const attack = () => {
    if (!squad() && !reinforcement) return

    const bestMatch = findBestMatch()
    state.attackers.forEach(attacker => {
        if (attacker.attack(bestMatch) === ERR_NOT_IN_RANGE) {
            attacker.moveTo(bestMatch)
        }
        if (attacker.rangedAttack(bestMatch) === ERR_NOT_IN_RANGE) {
            attacker.moveTo(bestMatch)
        }
    })
}
