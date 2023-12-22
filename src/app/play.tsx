import { useState } from 'preact/hooks'

import { useAppStoreUpdate } from '~/store/ctx'
import type { PlayRoute } from '~/store/state'
import { Card } from './comps/card'

export const Play = ({ route }: { route: PlayRoute }) => {
  const update = useAppStoreUpdate()
  const card = route.game.cards[route.current]!
  const [g, set] = useState(card.guess)
  const progressNum = Math.floor(
    (route.current / route.game.cards.length) * 100 + 5,
  )
  return (
    <div>
      <Card key={card.card.id} card={card.card} />
      <form
        onSubmit={e => {
          e.preventDefault()
          const guess = g
          set('')
          const cards = route.game.cards.map((c, i) =>
            i !== route.current ? c : { ...c, guess },
          )
          const current = route.current + 1
          const game = { ...route.game, cards }
          update(s =>
            current < route.game.cards.length
              ? {
                  ...s,
                  route: { ...route, game, current },
                }
              : {
                  ...s,
                  route: { is: 'result', game, settings: route.settings },
                },
          )
        }}
      >
        <p>
          <input
            type="text"
            placeholder="カード名を入力してください"
            value={g}
            onChange={(e: { target: unknown }) => {
              if (e.target instanceof HTMLInputElement) set(e.target.value)
            }}
          />
        </p>
        <button type="submit">次の問題に行く</button>
      </form>
      <p>
        <progress max="100" value={progressNum}>
          {progressNum}%
        </progress>
      </p>
    </div>
  )
}
