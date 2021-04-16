import React, { useEffect, useReducer } from 'react'
import { RouteComponentProps, Route, Redirect, } from 'react-router-dom'
import { useGlobalValue } from 'state/global-context/state'
import { authFormReducer } from 'state/authentication-reducer/reducer'
import { authFormState } from 'state/authentication-reducer/state'

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
		dispatch({ type: 'SET_FORM' })
	}, [props])

	const isAtLogin = props.location.pathname === '/login'
	const isAtRegister = props.location.pathname === '/register'

	if (!isAtLogin && !isAtRegister) return <></>

	const NonAuthRoute = ({ path, component: Component }) => (
		<>
			{
				<Route exact path={path} render={() => (
					!isAuth
						? <Component form={{ state, dispatch }} />
						: <Redirect to="/" />
				)} />
			}
		</>
	)

	return (
		<>
			<div className="credentials">
				<AuthNav props={props} />
				<NonAuthRoute path="/login" component={Login} />
				<NonAuthRoute path="/register" component={Register} />
			</div>
		</>
	)
}

export default Authentication