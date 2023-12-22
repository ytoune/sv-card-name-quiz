import { Play } from './play'
import { Result } from './result'
import { Top } from './top'

import { useAppStore } from '~/store/ctx'

export const Main = () => {
  const s = useAppStore()
  switch (s.route.is) {
    case 'top':
      return <Top />
    case 'play':
      return <Play route={s.route} />
    case 'result':
      return <Result route={s.route} />
  }
}
