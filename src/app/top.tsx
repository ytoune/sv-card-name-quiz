import { useAppStore, useAppStoreUpdate } from '../store/ctx'

import { CardSetId, cardSets } from '~/card-sets'
import { Clan, clanMap } from '~/cards'

const shuffle = <T,>([...array]: readonly T[]): T[] => {
	for (let i = array.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		;[array[i], array[j]] = [array[j]!, array[i]!]
	}
	return array
}

export const Top = () => {
	const state = useAppStore()
	const update = useAppStoreUpdate()
	const selectedClans = new Set(state.settings.clans)
	const selectedCardSets = new Set(state.settings.cardSets)
	return (
		<div>
			<h1>シャドバカード名クイズ</h1>
			<button
				onClick={() => {
					update(s => {
						const clans = new Set(s.settings.clans)
						const sets = new Set(s.settings.cardSets)
						const cards = shuffle(
							s.cards.filter(
								c =>
									clans.has(c.clan) &&
									sets.has(c.cardSet) &&
									90000 !== c.cardSet,
							),
						)
							.slice(0, 10)
							.map(card => ({ card, guess: '' }))
						return {
							...s,
							route: {
								is: 'play',
								game: { cards },
								current: 0,
								settings: s.settings,
							},
						}
					})
				}}
			>
				開始
			</button>
			<p>
				クラス:
				<br />
				{Object.entries(clanMap).map(([val, name]) => (
					<label style={{ userSelect: 'none' }}>
						<input
							type="checkbox"
							name="clans"
							checked={selectedClans.has(Number(val) as Clan)}
							onChange={e => {
								if (e.target instanceof HTMLInputElement) {
									const checked = e.target.checked
									update(s => {
										const clans = new Set(s.settings.clans)
										const id = Number(val) as Clan
										if (checked) clans.add(id)
										else clans.delete(id)
										return {
											...s,
											settings: { ...s.settings, clans: Array.from(clans) },
										}
									})
								}
							}}
						/>
						{name}
					</label>
				))}
			</p>
			<p>
				カードパック:
				<br />
				<select
					multiple
					size={16}
					onChange={e => {
						if (e.target instanceof HTMLSelectElement) {
							const cardSets = Array.from(e.target.options)
								.filter(e => e.selected)
								.map(e => Number(e.value) as CardSetId)
							update(s => ({
								...s,
								settings: {
									...s.settings,
									cardSets,
								},
							}))
						}
					}}
				>
					{cardSets.map(set => (
						<option value={set[1]} selected={selectedCardSets.has(set[1])}>
							{set[0]}
						</option>
					))}
				</select>
			</p>
		</div>
	)
}
