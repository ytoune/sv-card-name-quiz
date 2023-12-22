import { CardSetId, cardSets } from '~/card-sets'
import { Card, Clan, getList } from '~/cards'

type Settings = Readonly<{
  clans: readonly Clan[]
  cardSets: readonly CardSetId[]
}>

export type Game = Readonly<{
  cards: readonly Readonly<{ card: Card; guess: string }>[]
}>

export type TopRoute = Readonly<{
  is: 'top'
}>
export type PlayRoute = Readonly<{
  is: 'play'
  settings: Settings
  current: number
  game: Game
}>
export type ResultRoute = Readonly<{
  is: 'result'
  settings: Settings
  game: Game
}>

export type Route = TopRoute | PlayRoute | ResultRoute

export type State = Readonly<{
  cards: readonly Card[]
  route: Route
  settings: Settings
  history: readonly ResultRoute[]
}>

export const initState = (): State => {
  const cards = getList().filter(c => c.name)
  const setIds = cardSets
    .filter(s => s[1] < 70000)
    .map(s => s[1])
    .sort((q, w) => w - q)
    .slice(0, 5)
  if (!setIds.includes(10000)) setIds.push(10000)
  return {
    cards,
    route: { is: 'top' },
    settings: { clans: [0, 1, 2, 3, 4, 5, 6, 7, 8], cardSets: setIds },
    history: [],
  }
}
