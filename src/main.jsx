import { ReactKeycloakProvider } from '@react-keycloak/web'
import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import UserStore from './UserStore.js'
import keycloakInstance from './keycloak.js'

export const Context = createContext(null)

ReactDOM.createRoot(document.getElementById('root')).render(
	<Context.Provider value={{ user: new UserStore() }}>
		<BrowserRouter>
			<ReactKeycloakProvider authClient={keycloakInstance}>
				<App />
			</ReactKeycloakProvider>
		</BrowserRouter>
	</Context.Provider>
)
