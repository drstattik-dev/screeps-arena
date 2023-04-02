import { attack, spawnAttacker } from './attack/attacker'
import { haul, spawnHauler } from './haul/hauler'

export function loop(): void {
    spawnHauler()
    haul()
    spawnAttacker()
    attack()
}
