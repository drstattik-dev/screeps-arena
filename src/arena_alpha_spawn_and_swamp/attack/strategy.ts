import { getEnemyAttackers, getEnemyCarries, getEnemyTowers, getSpawn } from 'arena_alpha_spawn_and_swamp/utils/getters'
import { Creep, StructureSpawn, StructureTower } from 'game/prototypes'

interface EnemyTargets {
    enemyCreeps: Creep[]
    enemyCarries: Creep[]
    enemyTowers: StructureTower[]
    enemySpawn: StructureSpawn
}

const stratTarget: () => EnemyTargets = () => {
    const enemyCreeps = getEnemyAttackers()
    const enemyCarries = getEnemyCarries()
    const enemyTowers = getEnemyTowers()
    const enemySpawn = getSpawn(false)

    return {
        enemyCreeps,
        enemyCarries,
        enemyTowers,
        enemySpawn,
    }
}

export const findBestMatch = () => {
    const { enemyCreeps, enemyCarries, enemyTowers, enemySpawn } = stratTarget()

    if (enemyTowers.length > 0) {
        return enemyTowers[0]
    } else if (enemyCreeps.length > 0) {
        return enemyCreeps[0]
    } else if (enemyCarries.length > 0) {
        return enemyCarries[0]
    } else {
        return enemySpawn
    }
}

export const findBestMatchForReinforcements = () => {
    const { enemyCarries, enemyCreeps, enemySpawn } = stratTarget()

    const targets = [...enemyCarries, ...enemyCreeps, enemySpawn]

    return targets.length === 1 ? targets[1] : targets[0]
}
