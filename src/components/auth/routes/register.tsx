import React, { useEffect } from 'react'

import AuthForm from '../auth-form'

interface Props {
	formState: AuthFormState
	formDispatch: AuthFormDispatch
}

const Register: React.FC<Props> = ({ formState, formDispatch }) => {

	async function submit(): Promise<void> {
		formDispatch({ type: 'SUBMITTING' })

		const res = await fetch(process.env.REACT_APP_ENDPOINT + '/register', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: formState.username, password: formState.password })
		})
		const status = res.status

		switch (status) {
			case 409: // Name Conflict
				formDispatch({ type: 'NAME_CONFLICT' })
				break;
			case 201: // Created
				formDispatch({ type: 'USER_CREATED' })
				break;
			default:
				break;
		}
	}

	return (
		<>
			<AuthForm
				submit={submit}
				formState={formState}
				formDispatch={formDispatch} />
		</>
	)
}

export default Register