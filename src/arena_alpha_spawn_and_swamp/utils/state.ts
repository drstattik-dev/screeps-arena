import { Creep, StructureSpawn } from 'game/prototypes'

interface State {
    spawn: StructureSpawn | null
    enemySpawn: StructureSpawn | null
    attackers: Creep[]
    haulers: Creep[]
    extensionHaulers: Creep[]
    healers: Creep[]
    stage: number
}

export const state: State = {
    spawn: null,
    enemySpawn: null,
    attackers: [],
    haulers: [],
    extensionHaulers: [],
    healers: [],
    stage: 0,
}
