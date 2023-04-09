import { ATTACK, BodyPartConstant, CARRY, HEAL, MOVE, RANGED_ATTACK } from 'game/constants'

export const haulerTemplate: BodyPartConstant[] = [MOVE, CARRY, MOVE, CARRY]

export const attackerTemplate: BodyPartConstant[] = [MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, ATTACK, ATTACK]

export const healerTemplate: BodyPartConstant[] = [MOVE, MOVE, HEAL, HEAL, MOVE, HEAL]
