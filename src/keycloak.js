import Keycloak from 'keycloak-js'

const keycloakInstance = new Keycloak({
	url: 'http://localhost:8086',
	redirectUri: 'http://localhost:5173',
	realm: 'TEST',
	clientId: 'TEST_client',
})

export default keycloakInstance
