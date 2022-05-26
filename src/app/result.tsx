import { useAppStoreUpdate } from '~/store/ctx'
import type { ResultRoute } from '~/store/state'

export const Result = ({ route }: { route: ResultRoute }) => {
	const update = useAppStoreUpdate()
	let score = 0
	for (const c of route.game.cards) if (c.card.name === c.guess) score += 1
	return (
		<div>
			<p>
				{route.game.cards.length} 問中 {score} 問正解
			</p>
			<ul>
				{route.game.cards.map(c => (
					<li key={c.card.id}>
						<span style={{ fontWeight: 'bold', marginRight: '.5em' }}>
							{c.card.name === c.guess ? '◎' : '×'}
						</span>
						<span style={{ marginRight: '.5em' }}>{c.card.name}</span>
						<span>{c.guess}</span>
					</li>
				))}
			</ul>
			<p>
				<button
					onClick={() => {
						update(s => ({ ...s, route: { is: 'top' } }))
					}}
				>
					トップに戻る
				</button>
			</p>
		</div>
	)
}
