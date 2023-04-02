import { Creep } from 'game/prototypes'
import { Role } from '../constants/enums'

declare module 'game/prototypes' {
    export interface Creep {
        role: Role
        position: () => RoomPosition
    }
}

Creep.prototype.role = Role.None
Creep.prototype.position = () => {
    return { x, y }
}
