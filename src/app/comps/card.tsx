import { Card as ICard } from '~/cards'

export const Card = ({ card }: { card: ICard }) => (
  <p className="card">
    <img
      src={`https://shadowverse-portal.com/image/card/phase2/common/C/C_${card.id}.png`}
    />
  </p>
)
