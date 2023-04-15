import { MaxNumberCreep, Role } from 'arena_alpha_spawn_and_swamp/constants/enums'
import { checkIfSpawnContainer, findEnergyContainer, getSpawn } from 'arena_alpha_spawn_and_swamp/utils/getters'
import { state } from 'arena_alpha_spawn_and_swamp/utils/state'
import { haulerTemplate } from 'arena_alpha_spawn_and_swamp/utils/templates'
import { ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from 'game/constants'
import { Creep } from 'game/prototypes'

const spawn = getSpawn()

export const spawnHauler = () => {
    if (state.haulers.length < MaxNumberCreep.HAULER) {
        const newCreep: Creep | undefined = spawn.spawnCreep(haulerTemplate).object
        if (newCreep) {
            newCreep.role = Role.Hauler
            state.haulers.push(newCreep)
        }
    } else {
        state.haulers.mutationFilter(creep => creep.exists)
    }
}

const harvest = (creep: Creep) => {
    const source = findEnergyContainer(creep)
    if (source) {
        if (checkIfSpawnContainer(source)) {
            if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        } else {
            // TODO
            return
        }
    }
}

const transfer = (creep: Creep) => {
    if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn)
    }
}

export const haul = () => {
    state.haulers.forEach((creep: Creep) => {
        const fullCapacity = creep.store?.getCapacity(RESOURCE_ENERGY)
        if (fullCapacity && creep.store[RESOURCE_ENERGY] < fullCapacity) {
            harvest(creep)
        } else {
            transfer(creep)
        }
    })
}
