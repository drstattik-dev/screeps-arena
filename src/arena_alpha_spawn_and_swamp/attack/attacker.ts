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
    return state.attackers.filter(attacker => attacker.x !== spawn.x || attacker.y !== spawn.y)
}

const squad: () => boolean = () => {
    if (getEffectiveAttackers().length === MaxNumberCreep.ATTACKER) {
        return true
    } else {
        state.attackers.forEach(attacker => {
            attacker.moveTo({ x: getSpawn().x - 4, y: getSpawn().y })
        })
        return false
    }
}

export const spawnAttacker = () => {
    if (state.attackers.length < MaxNumberCreep.ATTACKER) {
        const newCreep: Creep | undefined = spawn.spawnCreep(attackerTemplate).object
        if (newCreep) {
            newCreep.role = Role.Attacker
            state.attackers.push(newCreep)
        }
    } else {
        state.attackers = state.attackers.filter(creep => creep.exists)
        reinforcement = true
    }
}

export const attack = () => {
    console.log(state.attackers)

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
