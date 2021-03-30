import React, { useEffect, useReducer } from 'react'
import { RouteComponentProps, Route } from 'react-router-dom'
import { useGlobalValue } from 'state/state'
import { authFormState, authFormReducer } from 'state/authReducer/reducer'

import AuthNav from './auth-nav'
import Login from './routes/login'
import Register from './routes/register'

interface Props {
	props: RouteComponentProps
}

const Authentication: React.FC<Props> = ({ props }) => {
	const [{ user: { isAuth } }] = useGlobalValue()

	const [state, dispatch] = useReducer(authFormReducer, authFormState)

	useEffect(() => {
		if (isAuth) props.history.push('/')
	}, [isAuth])

	useEffect(() => {
		dispatch({ type: 'TITLE', value: window.location.pathname.split('/')[2] })
	}, [props])

	return (
		<>
			<div className="credentials">
				<AuthNav props={props} />
				<Route exact path="/auth/login" render={() => (
					<Login formState={state} formDispatch={dispatch} />
				)} />
				<Route exact path="/auth/register" render={() => (
					<Register formState={state} formDispatch={dispatch} />
				)} />
			</div>
		</>
	)
}

export default Authentication