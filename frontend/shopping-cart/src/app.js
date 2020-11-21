import React from 'react';
import { Provider } from "react-redux"
import { Store } from './redux/store'
import PageSwitcher from './pages'
import AppBar from './pages/common/appbar'


const App = (props) => {
	return (
		<Provider store={Store}>
			<AppBar />
            <PageSwitcher />
		</Provider>
	);
}

export default App
