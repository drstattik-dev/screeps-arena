import { MaxNumberCreep, Role } from 'arena_alpha_spawn_and_swamp/constants/enums'
import { findAllEnergyContainers, getSpawn } from 'arena_alpha_spawn_and_swamp/utils/getters'
import { state } from 'arena_alpha_spawn_and_swamp/utils/state'
import { haulerTemplate } from 'arena_alpha_spawn_and_swamp/utils/templates'
import { RESOURCE_ENERGY, TERRAIN_WALL } from 'game/constants'
import { Creep, StructureContainer, StructureExtension } from 'game/prototypes'
import { createConstructionSite, getTerrainAt } from 'game/utils'

const spawn = getSpawn()

const createConstructionSites = (source: StructureContainer) => {
    const { x, y } = source.pos

    let site

    if (getTerrainAt({ x: x + 1, y: y + 1 }) !== TERRAIN_WALL) {
        site = createConstructionSite({ x: x + 1, y: y + 1 }, StructureExtension)
    } else if (getTerrainAt({ x, y: y + 1 }) !== TERRAIN_WALL) {
        site = createConstructionSite({ x, y: y + 1 }, StructureExtension)
    } else if (getTerrainAt({ x: x + 1, y }) !== TERRAIN_WALL) {
        site = createConstructionSite({ x: x + 1, y }, StructureExtension)
    } else if (getTerrainAt({ x: x - 1, y: y - 1 }) !== TERRAIN_WALL) {
        site = createConstructionSite({ x: x - 1, y: y - 1 }, StructureExtension)
    } else if (getTerrainAt({ x: x - 1, y }) !== TERRAIN_WALL) {
        site = createConstructionSite({ x: x - 1, y }, StructureExtension)
    } else if (getTerrainAt({ x, y: y - 1 }) !== TERRAIN_WALL) {
        site = createConstructionSite({ x, y: y - 1 }, StructureExtension)
    }

    if (site && site.object) {
        return site.object
    } else {
        return undefined
    }
}

const checkExtensions = () => {
    const energyContainers = findAllEnergyContainers()

    energyContainers.forEach((container: StructureContainer) => {
        if (!state.extensions.has(container.id)) {
            const site = createConstructionSites(container)
            if (site) {
                state.extensions.set(container.id, site)
            }
        }
    })
}

export const spawnExtensionHauler = () => {
    if (state.stage < 1) return

    if (state.extensionHaulers.length < MaxNumberCreep.EXTENSION_HAULER) {
        const newCreep: Creep | undefined = spawn.spawnCreep(haulerTemplate).object
        if (newCreep) {
            newCreep.role = Role.ExtensionHauler
            state.extensionHaulers.push(newCreep)
        }
    } else {
        state.extensionHaulers.mutationFilter(creep => creep.exists)
    }
}

const harvest = (creep: Creep) => {
    // TODO
    return
}

const transfer = (creep: Creep) => {
    // TODO
    return
}

export const haul = () => {
    if (state.stage < 1) return

    checkExtensions()

    state.extensionHaulers.forEach((creep: Creep) => {
        const fullCapacity = creep.store?.getCapacity(RESOURCE_ENERGY)
        if (fullCapacity && creep.store[RESOURCE_ENERGY] < fullCapacity) {
            harvest(creep)
        } else {
            transfer(creep)
        }
    })
}
