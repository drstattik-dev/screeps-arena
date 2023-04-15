import { getSpawn } from 'arena_alpha_spawn_and_swamp/utils/getters'
import { ERR_NOT_OWNER, OK } from 'game/constants'
import { Creep } from 'game/prototypes'
import { Role } from '../constants/enums'

declare global {
    interface Array<T> {
        mutationFilter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): void
    }
}

if (!Array.prototype.mutationFilter) {
    Array.prototype.mutationFilter = function <T>(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any) {
        for (let i = 0; i < this.length; i++) {
            if (predicate.call(thisArg, this[i], i, this)) {
                continue
            } else {
                this.splice(i, 1)
                i--
            }
        }
    }
}

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

    interface RoomPosition {
        pos?: RoomPosition
    }
}

if (!Creep.prototype.role) {
    Creep.prototype.role = Role.None
}

if (!Creep.prototype.isSpawning) {
    Creep.prototype.isSpawning = function () {
        const spawn = getSpawn(this.my)
        return spawn.x === this.x && spawn.y === this.y
    }
}

export const init = () => {
    console.log('merge.proto.ts.init()')
}
