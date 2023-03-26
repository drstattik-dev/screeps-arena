import { StructureSpawn } from 'game/prototypes'
import { getObjectsByPrototype } from 'game/utils'

export {}

declare module 'game/prototypes' {
    interface StructureSpawn {
        getSpawn: () => StructureSpawn | undefined
    }
}

StructureSpawn.prototype.getSpawn = () => {
    return getObjectsByPrototype(StructureSpawn).find(i => i.my)
}
