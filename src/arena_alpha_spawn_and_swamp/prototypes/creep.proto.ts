import { Creep } from 'game/prototypes'
import { Role } from '../constants/enums'

declare module 'game/prototypes' {
    export interface Creep {
        role: Role
    }
}

Creep.prototype.role = Role.None
