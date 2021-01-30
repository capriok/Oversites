import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useGlobalValue } from 'state/state'

import AuthForm from './auth-form'
import AuthNav from './auth-nav'

interface Props {
	props: RouteComponentProps
}

const Credentials: React.FC<Props> = ({ props }) => {
	const [{ user }] = useGlobalValue()
	if (user.isAuthenticated) window.location.href = '/'

	return (
		<>
			<div className="credentials">
				<AuthNav className="auth-nav" props={props} />
				<AuthForm props={props} />
			</div>
		</>
	)
}

export default Credentials