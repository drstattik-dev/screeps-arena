import { MaxNumberCreep, Role } from 'arena_alpha_spawn_and_swamp/constants/enums'
import { getEnemyAttackers, getSpawn } from 'arena_alpha_spawn_and_swamp/utils/getters'
import { state } from 'arena_alpha_spawn_and_swamp/utils/state'
import { attackerTemplate } from 'arena_alpha_spawn_and_swamp/utils/templates'
import { ERR_NOT_IN_RANGE, ERR_NO_BODYPART } from 'game/constants'
import { Creep, StructureSpawn, StructureTower } from 'game/prototypes'
import { findBestMatch } from './strategy'

const spawn = getSpawn()

const getEffectiveAttackers = () => {
    return state.attackers.filter(attacker => !attacker.isSpawning() && attacker.id !== undefined)
}

const squadAttack = (attacker: Creep, bestMatch: StructureSpawn | Creep | StructureTower) => {
    switch (attacker.attack(bestMatch)) {
        case ERR_NOT_IN_RANGE:
            attacker.moveTo(bestMatch)
            break
        case ERR_NO_BODYPART:
            attacker.moveTo(state.healers.find(healer => healer.id !== undefined) || bestMatch)
            break
        default:
            break
    }
}

const squad: () => boolean = () => {
    if (getEffectiveAttackers().length === MaxNumberCreep.ATTACKER) {
        return true
    } else {
        const closeEnemy = getEnemyAttackers().find(creep => creep.getRangeTo(spawn) < 7)
        if (closeEnemy) {
            state.attackers.forEach(attacker => {
                squadAttack(attacker, closeEnemy)
            })
        } else {
            state.attackers.forEach(attacker => {
                const xDirection = getSpawn().x === 5 ? 4 : -4
                attacker.moveTo({ x: getSpawn().x + xDirection, y: getSpawn().y })
            })
        }
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
        state.attackers.mutationFilter(creep => creep.exists)
    }
}

export const attack = () => {
    if (!squad()) return

    state.attackers.forEach(attacker => {
        const bestMatch = findBestMatch(attacker)
        squadAttack(attacker, bestMatch)
    })
}
