import { useKeycloak } from '@react-keycloak/web'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Login from './Login'
import Other from './Other'
import Protect from './Protect'
import { Context } from './main'
import Departments from './pages/Departments'
import Leaders from './pages/Leaders'

const App = observer(() => {
	const { keycloak, initialized } = useKeycloak()

	const logout = () => {
		keycloak.logout({
			redirectUri: 'http://localhost:5173/login',
		})
	}

	const { user } = useContext(Context)

	useEffect(() => {
		if (initialized && keycloak.authenticated) {
			// Если пользователь авторизован загружаем инфу по нему из БД
			keycloak.loadUserProfile().then(profile => {
				fetch(`http://localhost:8001/api/user/children/${profile.username}`)
					.then(res => {
						return res.json()
					})
					.then(resBody => {
						const body = {
							...profile,
							role: keycloak.realmAccess.roles,
							fio: resBody[0].json_build_object.fio,
							children: resBody[0].json_build_object.children,
							departments: resBody[0].json_build_object.departments,
							head_dept: resBody[0].json_build_object.head_dept,
							head_name: resBody[0].json_build_object.head_name,
						}
						console.log(body)
						// храним инфу в mobx
						user.setIsAuth(true)
						user.setUser(body)
					})
					.catch(error => console.log(error))
			})
		}
	}, [keycloak.authenticated])

	return (
		<>
			<div>{user.user.username}</div>
			<button onClick={logout}>Выйти</button>
			<Routes>
				<Route path={'/login'} element={<Login />} />
				<Route
					path={'/'}
					element={
						<Protect>
							<Home />
						</Protect>
					}
				/>
				<Route
					path={'/otherEmp/:name'}
					element={
						<Protect role={['user', 'ADMIN']}>
							<Other />
						</Protect>
					}
				/>
				<Route
					path={'/otherDep/:department'}
					element={
						<Protect role={['user', 'ADMIN']}>
							<Other />
						</Protect>
					}
				/>
				<Route
					path={'/leaders'}
					element={
						<Protect role={['ADMIN']}>
							<Leaders />
						</Protect>
					}
				/>
				<Route
					path={'/leaders/:name'}
					element={
						<Protect role={['user']}>
							<Departments />
						</Protect>
					}
				/>
				<Route path={'*'} element={<div>404</div>} />
			</Routes>
		</>
	)
})

export default App
