import { ATTACK, HEAL, RANGED_ATTACK, RESOURCE_ENERGY } from 'game/constants'
import { Creep, StructureContainer, StructureSpawn, StructureTower } from 'game/prototypes'
import { findClosestByPath, getObjectsByPrototype } from 'game/utils'

export const getSpawn = (_mine = true) => {
    const toReturn = getObjectsByPrototype(StructureSpawn).find(i => (_mine ? i.my : !i.my))

    if (toReturn) return toReturn
    else {
        return new StructureSpawn()
    }
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
        (creep.body.find(part => part.type === ATTACK) ||
            creep.body.find(part => part.type === RANGED_ATTACK) ||
            creep.body.find(part => part.type === HEAL))
    )
}

export const getEnemyAttackers = () => {
    return getObjectsByPrototype(Creep).filter(enemyThreatsPredicate)
}

export const getEnemyTowers = () => {
    return getObjectsByPrototype(StructureTower).filter(struct => !struct.my)
}

export const findEnemyCreeps = (attacker: Creep) => {
    const enemiesPosition = getEnemyAttackers().map(enemy => enemy.position())

    return findClosestByPath(attacker.position(), enemiesPosition)
}
