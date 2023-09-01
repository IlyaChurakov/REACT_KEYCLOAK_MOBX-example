import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Other = () => {
	const { name, department } = useParams()

	return (
		<div>
			<p>{name || department}</p>
			<Link to={'/'}>На главную</Link>
		</div>
	)
}

export default Other
