import type { Card as ICard } from '~/cards'
import { useAppStoreUpdate } from '~/store/ctx'
import type { ResultRoute } from '~/store/state'
import { Card } from './comps/card'

const Line = ({ card, guess }: { card: ICard; guess: string }) => {
  const ok = card.name === guess
  const badHasGuess = !ok && guess
  return (
    <li key={card.id} className={'answers ' + (ok ? 'ok' : 'bad')}>
      <span className="mark">{ok ? '◎' : '×'}</span>
      {badHasGuess ? <span className="guess">{guess}</span> : null}
      <span className={'name' + (badHasGuess ? ' small' : '')}>
        {card.name}
      </span>
      <Card key={card.id} card={card} />
    </li>
  )
}

export const Result = ({ route }: { route: ResultRoute }) => {
  const update = useAppStoreUpdate()
  let score = 0
  for (const c of route.game.cards) if (c.card.name === c.guess) score += 1
  return (
    <div>
      <p className="result-title">
        {route.game.cards.length} 問中 {score} 問正解
      </p>
      <ul>
        {route.game.cards.map(c => (
          <Line key={c.card.id} card={c.card} guess={c.guess} />
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
