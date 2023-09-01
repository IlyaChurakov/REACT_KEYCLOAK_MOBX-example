import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
	return (
		<div>
			<p>Home page</p>
			<Link to={'/other'}>Перейти на другую страницу</Link>
		</div>
	)
}

export default Home
