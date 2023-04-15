import { ATTACK, CARRY, HEAL, RANGED_ATTACK, RESOURCE_ENERGY, WORK } from 'game/constants'
import { Creep, StructureContainer, StructureSpawn, StructureTower } from 'game/prototypes'
import { findClosestByPath, getObjectsByPrototype } from 'game/utils'
import { state } from './state'

export const getSpawn = (_mine = true) => {
    if (_mine && state.spawn) {
        return state.spawn
    }

    if (!_mine && state.enemySpawn) {
        return state.enemySpawn
    }

    const toReturn = getObjectsByPrototype(StructureSpawn).find(i => (_mine ? i.my : !i.my))

    if (toReturn) {
        if (_mine) state.spawn = toReturn
        else state.enemySpawn = toReturn

        return toReturn
    } else {
        return new StructureSpawn()
    }
}

export const checkIfSpawnContainer = (container: StructureContainer) => {
    return getSpawn().getRangeTo(container) < 5
}

export const findEnergyContainer = (creep: Creep) => {
    const energySources = getObjectsByPrototype(StructureContainer).filter(source => {
        const energyValue = source.store.getUsedCapacity(RESOURCE_ENERGY)
        return energyValue && energyValue > 10
    })
    return creep.findClosestByRange(energySources)
}

const enemyThreatsPredicate = (creep: Creep) => {
    return (
        !creep.my &&
        !creep.isSpawning() &&
        (creep.body.find(part => part.type === ATTACK) ||
            creep.body.find(part => part.type === RANGED_ATTACK) ||
            creep.body.find(part => part.type === HEAL))
    )
}

const enemyCarriesPredicate = (creep: Creep) => {
    return !creep.my && !creep.isSpawning() && (creep.body.find(part => part.type === CARRY) || creep.body.find(part => part.type === WORK))
}

export const getEnemyAttackers = () => {
    return getObjectsByPrototype(Creep).filter(enemyThreatsPredicate)
}

export const getEnemyTowers = () => {
    return getObjectsByPrototype(StructureTower).filter(struct => !struct.my)
}

export const findEnemyCreeps = (attacker: Creep) => {
    const enemiesPosition = getEnemyAttackers().map(enemy => {
        return { x: enemy.x, y: enemy.y }
    })

    return findClosestByPath({ x: attacker.x, y: attacker.y }, enemiesPosition)
}

export const getEnemyCarries = () => {
    return getObjectsByPrototype(Creep).filter(enemyCarriesPredicate)
}
