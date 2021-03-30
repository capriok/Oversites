import React, { useEffect } from 'react'
import { useGlobalValue } from 'state/state'

import AuthForm from '../auth-form'

interface Props {
	formState: AuthFormState
	formDispatch: AuthFormDispatch
}

const Login: React.FC<Props> = ({ formState, formDispatch }) => {
	const [{ }, globalDispatch] = useGlobalValue()


	async function submit(): Promise<void> {
		formDispatch({ type: 'SUBMITTING' })

		const res = await fetch(process.env.REACT_APP_ENDPOINT + '/login', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: formState.username, password: formState.password })
		})
		const status = res.status
		const user = await res.json()

		switch (status) {
			case 401: // Not Found
				formDispatch({ type: 'NOT_FOUND' })
				break;
			case 409: //Unathorized
				formDispatch({ type: 'PASS_CONFLICT' })
				break;
			case 200: // Ok
				formDispatch({ type: 'AUTHENTICATE' })
				successfulAuthentication(user)
				break;
			default:
				break;
		}
	}

	function successfulAuthentication(user: User | any) {
		const authLogo = document.getElementById('authLogo')

		if (authLogo) {
			authLogo.classList.add('logo-anim')

			const hideDelay = setTimeout(() => {
				authLogo.classList.add('logo-hide')
				localStorage.setItem('OS_USERAUTH', JSON.stringify({ isAuth: true }))

				globalDispatch({
					type: 'USER_AUTH',
					payload: {
						...user,
						isAuth: true
					}
				})
				clearTimeout(hideDelay)
			}, 900)
		}
	}

	return (
		<>
			<AuthForm
				withGoogle
				submit={submit}
				formState={formState}
				formDispatch={formDispatch} />
		</>
	)
}

export default Login