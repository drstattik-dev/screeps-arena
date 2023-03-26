import { ATTACK, MOVE } from 'game/constants'
import { Creep, StructureSpawn } from 'game/prototypes'
import { getObjectsByPrototype } from 'game/utils'
import { Role } from './constants/enums'
import { haul, spawnHauler } from './haul/hauler'

let attacker: Creep | undefined
export function loop(): void {
    if (!attacker) {
        const mySpawn = getObjectsByPrototype(StructureSpawn).find(i => i.my)
        if (mySpawn) {
            attacker = mySpawn.spawnCreep([MOVE, ATTACK]).object
            if (attacker) attacker.role = Role.None
        }
    } else {
        const enemySpawn = getObjectsByPrototype(StructureSpawn).find(i => !i.my)
        if (enemySpawn) {
            attacker.moveTo(enemySpawn)
            attacker.attack(enemySpawn)
        }

        spawnHauler()
        haul()
    }
}
