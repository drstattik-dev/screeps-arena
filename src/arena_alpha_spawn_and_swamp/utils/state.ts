import { Creep, OwnedStructure, StructureSpawn } from 'game/prototypes'

interface State {
    spawn: StructureSpawn | null
    enemySpawn: StructureSpawn | null
    attackers: Creep[]
    haulers: Creep[]
    extensionHaulers: Creep[]
    healers: Creep[]
    stage: number
    extensions: Map<number | string, OwnedStructure>
}

export const state: State = {
    spawn: null,
    enemySpawn: null,
    attackers: [],
    haulers: [],
    extensionHaulers: [],
    healers: [],
    stage: 0,
    extensions: new Map<number | string, OwnedStructure>(),
}
