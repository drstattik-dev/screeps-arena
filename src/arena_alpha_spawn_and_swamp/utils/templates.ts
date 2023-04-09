import { ATTACK, BodyPartConstant, CARRY, HEAL, MOVE, RANGED_ATTACK } from 'game/constants'

export const haulerTemplate: BodyPartConstant[] = [MOVE, MOVE, CARRY, CARRY]

export const attackerTemplate: BodyPartConstant[] = [MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, RANGED_ATTACK, RANGED_ATTACK]

export const healerTemplate: BodyPartConstant[] = [MOVE, MOVE, MOVE, HEAL, HEAL, HEAL]
