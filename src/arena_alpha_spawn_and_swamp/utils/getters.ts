import { Creep, Source, StructureSpawn } from 'game/prototypes'
import { getObjectsByPrototype } from 'game/utils'

export const getSpawn = (_mine = true) => {
    const toReturn = getObjectsByPrototype(StructureSpawn).find(i => (_mine ? i.my : !i.my))

    if (toReturn) return toReturn
    else {
        return new StructureSpawn()
    }
}

export const findEnergyContainer = (creep: Creep) => {
    const energySources = getObjectsByPrototype(Source).filter(source => source.energy > 10)

    return creep.findClosestByRange(energySources)
}
