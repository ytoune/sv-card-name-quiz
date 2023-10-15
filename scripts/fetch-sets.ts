import fetch from 'cross-fetch'
import dayjs from 'dayjs'
import { JSDOM } from 'jsdom'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
// eslint-disable-next-line import/no-unassigned-import
import 'dayjs/locale/ja'
;(async () => {
	dayjs.locale('ja')
	const r = await fetch(
		'https://shadowverse-portal.com/cards?format=1&lang=ja',
		{
			headers: {
				Accept: '*/*',
				'Accept-Encoding': 'gzip, deflate, br',
				'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Referer: 'https://shadowverse-portal.com/cards?format=1&lang=ja',
				'User-Agent':
					'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
			},
		},
	)
	if (300 <= r.status) {
		console.log(r)
		throw new Error(`http error: ${r.statusText}`)
	}
	const { window } = new JSDOM(await r.text())
	const document: Document = window.document
	const labels = [...document.querySelectorAll('.cards-cardset-box label')]
	const getValue = (el: Element | null) =>
		Number((el as HTMLOptionElement).value)
	const info = labels.map(t => [
		(t.textContent || '').trim(),
		getValue(t.querySelector('[value]')),
	])
	await mkdir(join(__dirname, '../data'), { recursive: true })
	await writeFile(
		join(__dirname, '../data/sets.ts'),
		[
			'// @ts-nocheck',
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			'export const info = ' + JSON.stringify(info) + ' as const',
			'export const fetched = ' + JSON.stringify(dayjs().format('YYYY/MM/DD')),
			'export default info',
		]
			.map(t => t + '\n')
			.join(''),
		'utf8',
	)
})().catch(x => {
	console.error(x)
	process.exit(1)
})
