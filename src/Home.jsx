import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from './main'

const Home = observer(() => {
	const { user } = useContext(Context)

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h2>Home page</h2>
			<h3>Разделы</h3>
			{user?.user?.role?.includes('ADMIN') && (
				<Link to={'/leaders'}>Статистика</Link>
			)}
			{user?.user?.role?.includes('user') && (
				<Link to={`/leaders/${user.user.fio}`}>Статистика</Link>
			)}
		</div>
	)
})

export default Home
