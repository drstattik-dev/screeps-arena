import { getSpawn } from 'arena_alpha_spawn_and_swamp/utils/getters'
import { Creep } from 'game/prototypes'
import { Role } from '../constants/enums'

declare module 'game/prototypes' {
    interface Creep extends GameObject {
        role: Role
        isSpawning: () => boolean
    }
}

Creep.prototype.role = Role.None
Creep.prototype.isSpawning = function () {
    const spawn = getSpawn(this.my)
    return spawn.x === this.x && spawn.y === this.y
}

export const init = () => {
    console.log('creep.proto.ts.init()')
}
