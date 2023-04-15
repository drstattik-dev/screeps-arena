import { arenaInfo } from 'game'
import { getCpuTime } from 'game/utils'
import { attack, spawnAttacker } from './attack/attacker'
import { rangedAttack, spawnRangedAttacker } from './attack/rangedAttacker'
import { haul, spawnHauler } from './haul/hauler'
import { heal, spawnHealer } from './healer/healers'
import { init } from './prototypes/merge.proto'

init()
export function loop(): void {
    // console.log(state)

    spawnAttacker()
    attack()

    spawnRangedAttacker()
    rangedAttack()

    spawnHealer()
    heal()

    spawnHauler()
    haul()
    // console.log('------------------------------------------------')
    // console.log(state)

    console.log((Math.floor(getCpuTime() / 1000) / Math.floor(arenaInfo.cpuTimeLimit / 1000)) * 100)
}
