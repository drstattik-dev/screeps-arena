import { attack, spawnAttacker } from './attack/attacker'
import { haul, spawnHauler } from './haul/hauler'
import { heal, spawnHealer } from './healer/healers'

export function loop(): void {
    spawnHauler()
    haul()
    spawnAttacker()
    attack()
    spawnHealer()
    heal()
}
