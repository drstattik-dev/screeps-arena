import { MaxNumberCreep, Role } from 'arena_alpha_spawn_and_swamp/constants/enums'
import { findEnergyContainer, getSpawn } from 'arena_alpha_spawn_and_swamp/utils/getters'
import { haulerTemplate } from 'arena_alpha_spawn_and_swamp/utils/templates'
import { ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from 'game/constants'
import { Creep } from 'game/prototypes'

const spawn = getSpawn()

const haulers: Creep[] = []

export const spawnHauler = () => {
    if (haulers.length < MaxNumberCreep.HAULER) {
        const newCreep: Creep | undefined = spawn.spawnCreep(haulerTemplate).object
        if (newCreep) {
            newCreep.role = Role.Hauler
            haulers.push(newCreep)
        }
    }
}

const harvest = (creep: Creep) => {
    const source = findEnergyContainer(creep)
    if (source) {
        if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source)
        }
    }
}

const transfer = (creep: Creep) => {
    if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn)
    }
}

export const haul = () => {
    haulers.forEach((creep: Creep) => {
        const fullCapacity = creep.store?.getCapacity(RESOURCE_ENERGY)
        if (fullCapacity && creep.store[RESOURCE_ENERGY] < fullCapacity) {
            harvest(creep)
        } else {
            transfer(creep)
        }
    })
}
