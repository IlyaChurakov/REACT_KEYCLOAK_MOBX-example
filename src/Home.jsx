import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h2>Home page</h2>
			<h3>Сотрудники</h3>
			<Link to={'/otherEmp/Чураков Илья Михайлович'}>
				Чураков Илья Михайлович
			</Link>
			<Link to={'/otherEmp/Старкова Станислава Сергеевна'}>
				Старкова Станислава Сергеевна
			</Link>
			<Link to={'/otherEmp/Шорин Владлен Маусырович'}>
				Шорин Владлен Маусырович
			</Link>
			<h3>Департаменты</h3>
			<Link to={'/otherDep/Департамент цифровизации'}>
				Департамент цифровизации
			</Link>
			<Link to={'/otherDep/Группа разработки внутренних продуктов'}>
				Группа разработки внутренних продуктов
			</Link>
			<Link to={'/otherDep/Департамент управления персоналом'}>
				Департамент управления персоналом
			</Link>
		</div>
	)
}

export default Home
