import { attack, spawnAttacker } from './attack/attacker'
import { haul, spawnHauler } from './haul/hauler'
import { heal, spawnHealer } from './healer/healers'
import { init } from './prototypes/creep.proto'

init()
export function loop(): void {
    // console.log(state)

    spawnHauler()
    haul()
    spawnAttacker()
    attack()
    spawnHealer()
    heal()
    // console.log('------------------------------------------------')
    // console.log(state)
}
