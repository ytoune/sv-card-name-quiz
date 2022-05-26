import fetch from 'cross-fetch'
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
;(async () => {
	const r = await fetch(
		'https://shadowverse-portal.com/api/v1/cards?format=json&lang=ja',
	)
	console.log(r)
	await mkdir(join(__dirname, '../data'), { recursive: true })
	await writeFile(
		join(__dirname, '../data/cards.ts'),
		[
			'// @ts-nocheck',
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			'export default ' + (await r.text()) + ' as const',
		]
			.map(t => t + '\n')
			.join(''),
		'utf8',
	)
})().catch(x => {
	console.error(x)
	process.exit(1)
})
