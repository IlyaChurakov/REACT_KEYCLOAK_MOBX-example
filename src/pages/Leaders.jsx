import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Leaders = observer(() => {
	const [leaders, setLeaders] = useState(null)

	useEffect(() => {
		fetch(
			'http://localhost:8001/api/timecontrol/managers/2023-08-22/2023-09-01'
		)
			.then(res => res.json())
			.then(resBody => setLeaders(resBody))
			.catch(err => {
				throw new Error(err)
			})
	}, [])

	useEffect(() => {
		console.log(leaders)
	}, [leaders])

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			{leaders?.length &&
				leaders.map((item, key) => {
					return (
						<Link to={`/leaders/${item.name}`} key={key}>
							{item.name}
						</Link>
					)
				})}
		</div>
	)
})

export default Leaders
