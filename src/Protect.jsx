import { useKeycloak } from '@react-keycloak/web'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from './main'

const Protect = observer(({ children, role }) => {
	const { keycloak, initialized } = useKeycloak()
	const { user } = useContext(Context)

	const name = 'Чураков Илья Михайлович'

	useEffect(() => {
		if (initialized) {
			if (!keycloak.authenticated) {
				keycloak.login()
			}
		}
	}, [initialized])

	if (!initialized) {
		return <p>Loading initialization...</p>
	}

	if (!keycloak.authenticated) {
		return <p>Authenticating...</p>
	}

	if (user.user.role) {
		// Если доступ к ролям есть проверяем передана ли роль
		if (role) {
			// Если роль передана проверяем есть ли она у пользователя
			if (user.user.role.includes(role)) {
				// Если роль есть проверяем есть ли доступ к этой странице (name находится на странице перехода)
				if (user.user.children.includes(name)) {
					// Если доступ есть отдаем эту страницу
					return children
				} else {
					// Если доступа нет, редирект на главную
					return <Navigate to={'/'} />
				}
			} else {
				// Если такой роли у пользователя нет, редирект на главную
				return <Navigate to={'/'} />
			}
		} else {
			// Если роль не передана, значит маршрут доступен всем авторизованным пользователям
			return children
		}
	} else {
		return <p>Loading role...</p>
	}
})

export default Protect
