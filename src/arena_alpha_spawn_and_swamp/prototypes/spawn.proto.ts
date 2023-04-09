import { BodyPartConstant, MOVE } from 'game/constants'
import { StructureSpawn } from 'game/prototypes'

declare module 'game/prototypes' {
    export interface StructureSpawn {
        _spawnCreep: (body: BodyPartConstant[]) => SpawnCreepResult
    }
}

StructureSpawn.prototype._spawnCreep = function (body: BodyPartConstant[]) {
    console.log('cenas')
    if (!StructureSpawn.prototype._spawnCreep) {
        StructureSpawn.prototype._spawnCreep = StructureSpawn.prototype.spawnCreep

        StructureSpawn.prototype.spawnCreep = body => {
            console.log('Spawning:' + JSON.stringify(body))

            return StructureSpawn.prototype._spawnCreep(body)
        }
    }

    return StructureSpawn.prototype.spawnCreep(body)
}

StructureSpawn.prototype._spawnCreep([MOVE])
