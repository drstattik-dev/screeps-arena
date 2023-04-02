import { MaxNumberCreep, Role } from 'arena_alpha_spawn_and_swamp/constants/enums'
import { getSpawn } from 'arena_alpha_spawn_and_swamp/utils/getters'
import { attackerTemplate } from 'arena_alpha_spawn_and_swamp/utils/templates'
import { ERR_NOT_IN_RANGE } from 'game/constants'
import { Creep } from 'game/prototypes'

const spawn = getSpawn()
const enemySpawn = getSpawn(false)

export const attackers: Creep[] = []

export const getEffectiveAttackers = () => {
    return attackers.filter(attacker => attacker.x !== spawn.x || attacker.y !== spawn.y)
}

const squad: () => boolean = () => {
    if (getEffectiveAttackers().length === MaxNumberCreep.ATTACKER) {
        return true
    } else {
        attackers.forEach(attacker => {
            attacker.moveTo({ x: getSpawn().x, y: getSpawn().y + 6 })
        })
        return false
    }
}

export const spawnAttacker = () => {
    if (attackers.length < MaxNumberCreep.ATTACKER) {
        const newCreep: Creep | undefined = spawn.spawnCreep(attackerTemplate).object
        if (newCreep) {
            newCreep.role = Role.Attacker
            attackers.push(newCreep)
        }
    }
}

export const attack = () => {
    if (!squad()) return

    attackers.forEach(attacker => {
        if (attacker.attack(enemySpawn) === ERR_NOT_IN_RANGE) {
            attacker.moveTo(enemySpawn)
        }
        if (attacker.rangedAttack(enemySpawn) === ERR_NOT_IN_RANGE) {
            attacker.moveTo(enemySpawn)
        }
    })
}
