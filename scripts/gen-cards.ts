/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import * as fetchedCards from '../data/cards'
import * as fetchedSets from '../data/sets'

import type { Card } from '~/cards'

type FetchedCard = (typeof fetchedCards)['info']['data']['cards'][number]
type FetchedCardSetId = (typeof fetchedSets)['info'][number][1] | 90000

const getCardSetId = (c: FetchedCard): FetchedCardSetId => {
  if ('初音ミク' === c.card_name) return 70028
  if ('ボンド・フォージャー' === c.card_name) return 70030
  if ('アーニャ・フォージャー' === c.card_name) return 70030
  if ('ロイド・フォージャー' === c.card_name) return 70030
  if ('ヨル・フォージャー' === c.card_name) return 70030
  return c.card_set_id
}
;(async () => {
  const sets = fetchedSets.info //.slice().sort((q, w) => q[1] - w[1])
  const cards: Card[] = fetchedCards.info.data.cards
    .map(
      (c): Card => ({
        id: c.card_id,
        cardSet: getCardSetId(c),
        name: c.card_name,
        type: c.char_type,
        tribeName: c.tribe_name,
        clan: c.clan,
        rarity: c.rarity,
        cv: c.cv,
      }),
    )
    .sort((q, w) => q.id - w.id)
  const min = [fetchedCards.fetched, fetchedSets.fetched].sort((q, w) =>
    q.localeCompare(w),
  )[0]
  await mkdir(join(__dirname, '../src/gen'), { recursive: true })
  await writeFile(
    join(__dirname, '../src/gen/cards.ts'),
    [
      '// @ts-nocheck',
      'export const list = ' +
        JSON.stringify(cards)
          .replace(/\},\{/g, '},\n{')
          .replace(/^\[\{/, '[\n{')
          .replace(/\}\]$/, '},\n]') +
        ' as const',
      'export const sets = ' +
        JSON.stringify(sets)
          .replace(/\],\[/g, '],\n[')
          .replace(/^\[\[/, '[\n[')
          .replace(/\]\]$/, '],\n]') +
        ' as const',
      'export const fetched = ' + JSON.stringify(min),
    ]
      .map(t => t + '\n')
      .join(''),
  )
})().catch(x => {
  console.error(x)
  process.exit(1)
})
