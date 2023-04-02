import { getEnemyAttackers, getEnemyTowers, getSpawn } from 'arena_alpha_spawn_and_swamp/utils/getters'
import { Creep, StructureSpawn, StructureTower } from 'game/prototypes'

interface EnemyTargets {
    enemyCreeps: Creep[]
    enemyTowers: StructureTower[]
    enemySpawn: StructureSpawn
}

const stratTarget: () => EnemyTargets = () => {
    const enemyCreeps = getEnemyAttackers()
    const enemyTowers = getEnemyTowers()
    const enemySpawn = getSpawn(false)

    return {
        enemyCreeps,
        enemyTowers,
        enemySpawn,
    }
}

export const findBestMatch = () => {}
