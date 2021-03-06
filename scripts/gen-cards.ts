import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'

import info from '../data/cards'
;(async () => {
	const cards = info.data.cards.map(c => ({
		id: c.card_id,
		cardSet: c.card_set_id,
		name: c.card_name,
		type: c.char_type,
		tribeName: c.tribe_name,
		clan: c.clan,
		rarity: c.rarity,
		cv: c.cv,
	}))
	await mkdir(join(__dirname, '../src/gen'), { recursive: true })
	await writeFile(
		join(__dirname, '../src/gen/cards.ts'),
		[
			'// @ts-nocheck',
			'export const list = ' + JSON.stringify(cards) + ' as const',
		]
			.map(t => t + '\n')
			.join(''),
	)
})().catch(x => {
	console.error(x)
	process.exit(1)
})
