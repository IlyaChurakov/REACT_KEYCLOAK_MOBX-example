import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Departments = observer(() => {
	const [departments, setDepartments] = useState(null)
	const { name } = useParams()

	useEffect(() => {
		fetch(
			`http://localhost:8001/api/timecontrol/departments/2023-08-22/2023-09-01/${name}`
		)
			.then(res => res.json())
			.then(resBody => setDepartments(resBody))
			.catch(err => {
				throw new Error(err)
			})
	}, [])

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			{departments?.length &&
				departments.map((item, key) => {
					return (
						<Link to={`/employees/${item.short_name}`} key={key}>
							{item.short_name}
						</Link>
					)
				})}
		</div>
	)
})

export default Departments
