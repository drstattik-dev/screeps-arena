import { MaxNumberCreep, Role } from 'arena_alpha_spawn_and_swamp/constants/enums'
import { getEnemyAttackers, getSpawn } from 'arena_alpha_spawn_and_swamp/utils/getters'
import { state } from 'arena_alpha_spawn_and_swamp/utils/state'
import { rangedAttackerTemplate } from 'arena_alpha_spawn_and_swamp/utils/templates'
import { ERR_NOT_IN_RANGE, ERR_NO_BODYPART, OK } from 'game/constants'
import { Creep, StructureSpawn, StructureTower } from 'game/prototypes'
import { findBestMatch } from './strategy'

const spawn = getSpawn()

export const getEffectiveAttackers = () => {
    return state.rangedAttackers.filter(attacker => !attacker.isSpawning() && attacker.id !== undefined)
}

const squadAttack = (attacker: Creep, bestMatch: StructureSpawn | Creep | StructureTower) => {
    switch (attacker.rangedAttack(bestMatch)) {
        case OK:
            if (attacker.getRangeTo(bestMatch) < 3) {
                attacker.moveTo(spawn)
            }
            break
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
    if (getEffectiveAttackers().length === MaxNumberCreep.RANGED_ATTACKER) {
        return true
    } else {
        const closeEnemy = getEnemyAttackers().find(creep => creep.getRangeTo(spawn) < 7)
        if (closeEnemy) {
            state.rangedAttackers.forEach(attacker => {
                squadAttack(attacker, closeEnemy)
            })
        } else {
            state.rangedAttackers.forEach(attacker => {
                const xDirection = getSpawn().x === 5 ? 4 : -4
                attacker.moveTo({ x: getSpawn().x + xDirection, y: getSpawn().y })
            })
        }
        return false
    }
}

export const spawnRangedAttacker = () => {
    if (getEffectiveAttackers().length < MaxNumberCreep.RANGED_ATTACKER) {
        if (!spawn.spawning) {
            const newCreep: Creep | undefined = spawn.spawnCreep(rangedAttackerTemplate).object
            if (newCreep) {
                newCreep.role = Role.RangedAttacker
                state.rangedAttackers.push(newCreep)
            }
        }
    } else {
        state.rangedAttackers.mutationFilter(creep => creep.exists)
    }
}

export const rangedAttack = () => {
    if (!squad()) return

    state.rangedAttackers.forEach(attacker => {
        const bestMatch = findBestMatch(attacker)
        squadAttack(attacker, bestMatch)
    })
}
