import React from 'react';
import { Provider } from "react-redux"
import { Store } from './redux/store'
import PageSwitcher from './pages'

const App = (props) => {
	return (
		<Provider store={Store}>
            <PageSwitcher />
		</Provider>
	);
}

export default App
