import { useKeycloak } from '@react-keycloak/web'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { Context } from './main'

const Protect = observer(({ children, role }) => {
	const { keycloak, initialized } = useKeycloak()
	const { user } = useContext(Context)
	const { name, department } = useParams()

	const location = useLocation()

	useEffect(() => {
		// если пользователь не авторизован редирект на страницу авторизации
		if (initialized) {
			if (!keycloak.authenticated) {
				// Если пользователь не авторизован и у него происходит переход по ссылке на определенную страницу сотрудника, то после авторизации мы перейдем на нее
				keycloak.login({
					redirectUri: location.pathname,
				})
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
		// Если роль админ сразу отдаем страницу
		if (user.user.role.includes('ADMIN')) {
			return children
		}
		// Если доступ к ролям есть проверяем передана ли роль
		if (role) {
			// Если роль передана проверяем есть ли она у пользователя
			if (role.filter(element => user.user.role.includes(element)).length) {
				// Если роль есть проверяем есть ли доступ к этой странице (name находится на странице перехода)
				console.log(department)
				if (name && user.user.children?.includes(name)) {
					// Если доступ есть отдаем эту страницу
					return children
				} else if (department && user.user.departments?.includes(department)) {
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
