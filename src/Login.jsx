import { useKeycloak } from '@react-keycloak/web'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const { keycloak, initialized } = useKeycloak()
	const navigate = useNavigate()
	console.log('login page')
	useEffect(() => {
		if (initialized) {
			if (!keycloak.authenticated) {
				keycloak.login({
					redirectUri: 'http://localhost:5173/',
				})
			} else {
				navigate('/')
			}
		}
	}, [initialized])

	if (!initialized) {
		return <p>Loading...</p>
	}
}

export default Login
