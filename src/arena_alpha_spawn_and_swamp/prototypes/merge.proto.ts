import { getSpawn } from 'arena_alpha_spawn_and_swamp/utils/getters'
import { ERR_NOT_OWNER, OK } from 'game/constants'
import { Creep } from 'game/prototypes'
import { Role } from '../constants/enums'

declare module 'game/prototypes' {
    interface Creep extends GameObject {
        role: Role
        isSpawning: () => boolean
    }

    interface Spawning {
        needTime: number
        remainingTime: number
        creep: Creep
        cancel(): typeof OK | typeof ERR_NOT_OWNER | undefined
    }

    interface StructureSpawn extends OwnedStructure {
        spawning: Spawning
    }
}

Creep.prototype.role = Role.None
Creep.prototype.isSpawning = function () {
    const spawn = getSpawn(this.my)
    return spawn.x === this.x && spawn.y === this.y
}

export const init = () => {
    console.log('merge.proto.ts.init()')
}
