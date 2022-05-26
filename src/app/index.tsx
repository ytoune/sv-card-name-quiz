import { AppStoreProvider } from '../store/ctx'

import { Main } from './main'

export const App = () => (
	<AppStoreProvider>
		<Main />
	</AppStoreProvider>
)
