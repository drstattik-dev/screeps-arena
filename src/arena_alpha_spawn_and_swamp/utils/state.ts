import { Creep, StructureSpawn } from 'game/prototypes'

interface State {
    spawn: StructureSpawn | null
    enemySpawn: StructureSpawn | null
    attackers: Creep[]
    haulers: Creep[]
    healers: Creep[]
}

export const state: State = {
    spawn: null,
    enemySpawn: null,
    attackers: [],
    haulers: [],
    healers: [],
}
