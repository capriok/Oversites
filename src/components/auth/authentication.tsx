import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useGlobalValue } from 'state/state'

import AuthForm from './auth-form'
import AuthNav from './auth-nav'

interface Props {
	props: RouteComponentProps
}

const Authentication: React.FC<Props> = ({ props }) => {
	const [{ user: { au: { isAuth } } }] = useGlobalValue()

	useEffect(() => {
		if (isAuth) props.history.push('/')
	}, [isAuth])

	return (
		<>
			<div className="credentials">
				<AuthNav props={props} />
				<AuthForm props={props} />
			</div>
		</>
	)
}

export default Authentication