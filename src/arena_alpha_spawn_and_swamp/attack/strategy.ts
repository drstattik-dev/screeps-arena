import { Role } from 'arena_alpha_spawn_and_swamp/constants/enums'
import { getEnemyAttackers, getEnemyCarries, getEnemyTowers, getSpawn } from 'arena_alpha_spawn_and_swamp/utils/getters'
import { Creep, StructureSpawn, StructureTower } from 'game/prototypes'

interface EnemyTargets {
    enemyCreeps: Creep[]
    enemyCarries: Creep[]
    enemyTowers: StructureTower[]
    enemySpawn: StructureSpawn
    closestEnemy: Creep | StructureTower | StructureSpawn
}

const stratTarget: (creep: Creep) => EnemyTargets = (creep: Creep) => {
    const enemyCreeps = getEnemyAttackers().sort((a, b) => creep.getRangeTo(a) - creep.getRangeTo(b))
    const enemyCarries = getEnemyCarries().sort((a, b) => creep.getRangeTo(a) - creep.getRangeTo(b))
    const enemyTowers = getEnemyTowers().sort((a, b) => creep.getRangeTo(a) - creep.getRangeTo(b))
    const enemySpawn = getSpawn(false)
    const closestEnemy = [...enemyCreeps, ...enemyCarries, ...enemyTowers, enemySpawn].sort((a, b) => creep.getRangeTo(a) - creep.getRangeTo(b))[0]

    return {
        enemyCreeps,
        enemyCarries,
        enemyTowers,
        enemySpawn,
        closestEnemy,
    }
}

export const findBestMatch = (creep: Creep) => {
    const { enemyCreeps, enemyCarries, enemyTowers, enemySpawn, closestEnemy } = stratTarget(creep)

    if (creep.role === Role.RangedAttacker) {
        if (closestEnemy.getRangeTo(creep) < 10) {
            return closestEnemy
        } else if (enemyCreeps.length > 0) {
            return enemyCreeps[0]
        } else if (enemyTowers.length > 0) {
            return enemyTowers[0]
        } else if (enemyCarries.length > 0) {
            return enemyCarries[0]
        } else {
            return enemySpawn
        }
    } else {
        if (closestEnemy.getRangeTo(creep) < 10) {
            return closestEnemy
        } else if (enemyCarries.length > 0) {
            return enemyCarries[0]
        } else if (enemyCreeps.length > 0) {
            return enemyCreeps[0]
        } else if (enemyTowers.length > 0) {
            return enemyTowers[0]
        } else {
            return enemySpawn
        }
    }
}
