import { createContext, JSX } from 'preact'
import { useContext, useRef, useState } from 'preact/hooks'

import { initState, State } from './state'

type Update = (f: (s: State) => State) => void

const storeCtx = createContext<null | State>(null)
const updateCtx = createContext<null | Update>(null)

export const useAppStore = () => {
  const r = useContext(storeCtx)
  if (r) return r
  throw new Error('wtf')
}

export const useAppStoreUpdate = () => {
  const r = useContext(updateCtx)
  if (r) return r
  throw new Error('wtf')
}

export const AppStoreProvider = ({ children }: { children: JSX.Element }) => {
  const [s, set] = useState<State>(initState)
  const r = useRef<null | Update>(null)
  if (null === r.current)
    r.current = f => {
      set(f)
    }

  return (
    <updateCtx.Provider value={r.current}>
      <storeCtx.Provider value={s}>{children}</storeCtx.Provider>
    </updateCtx.Provider>
  )
}
