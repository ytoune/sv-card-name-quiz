import type { CardSetId } from './card-sets'
import { list } from './gen/cards'
export { fetched } from './gen/cards'

/** 1 = Follower, 2 = Amulet, 3 = Countdown Amulet, 4 = Spell */
export type CardType = 1 | 2 | 3 | 4
export type Clan = keyof typeof clanMap
export const clanMap = {
  0: 'ニュートラル',
  1: 'エルフ',
  2: 'ロイヤル',
  3: 'ウィッチ',
  4: 'ドラゴン',
  5: 'ネクロマンサー',
  6: 'ヴァンパイア',
  7: 'ビショップ',
  8: 'ネメシス',
} as const

/** Rarity. Values are 1 through 4 for Bronze upto Legendary. */
export type Rarity = keyof typeof rarityMap
export const rarityMap = {
  1: 'ブロンズレア',
  2: 'シルバーレア',
  3: 'ゴールドレア',
  4: 'レジェンド',
} as const

export type Card = Readonly<{
  id: number
  cardSet: CardSetId
  name: string | null
  type: CardType
  clan: Clan
  tribeName: string
  rarity: Rarity
  cv: string
}>

// eslint-disable-next-line
export const getList = (): readonly Card[] => list
