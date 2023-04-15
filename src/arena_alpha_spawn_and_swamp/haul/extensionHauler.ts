import { state } from 'arena_alpha_spawn_and_swamp/utils/state'
import { RESOURCE_ENERGY, TERRAIN_WALL } from 'game/constants'
import { Creep, StructureContainer, StructureExtension } from 'game/prototypes'
import { createConstructionSite, getTerrainAt } from 'game/utils'

export const haul = () => {
    state.extensionHaulers.forEach((creep: Creep) => {
        const fullCapacity = creep.store?.getCapacity(RESOURCE_ENERGY)
        if (fullCapacity && creep.store[RESOURCE_ENERGY] < fullCapacity) {
            harvest(creep)
        } else {
            transfer(creep)
        }
    })
}

const createConstructionSites = (source: StructureContainer) => {
    const { x, y } = source.pos

    if (getTerrainAt({ x: x + 1, y: y + 1 }) !== TERRAIN_WALL) {
        createConstructionSite({ x: x + 1, y: y + 1 }, StructureExtension)
    } else if (getTerrainAt({ x, y: y + 1 }) !== TERRAIN_WALL) {
        createConstructionSite({ x, y: y + 1 }, StructureExtension)
    } else if (getTerrainAt({ x: x + 1, y }) !== TERRAIN_WALL) {
        createConstructionSite({ x: x + 1, y }, StructureExtension)
    } else if (getTerrainAt({ x: x - 1, y: y - 1 }) !== TERRAIN_WALL) {
        createConstructionSite({ x: x - 1, y: y - 1 }, StructureExtension)
    } else if (getTerrainAt({ x: x - 1, y }) !== TERRAIN_WALL) {
        createConstructionSite({ x: x - 1, y }, StructureExtension)
    } else if (getTerrainAt({ x, y: y - 1 }) !== TERRAIN_WALL) {
        createConstructionSite({ x, y: y - 1 }, StructureExtension)
    }
}
