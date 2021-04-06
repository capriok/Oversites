import React from 'react'
import { useGlobalValue } from 'state/global-context/state'
import { Login as ApiLogin } from '../../../api/os'
import AuthForm from '../auth-form'

interface Props {
	form: {
		state: AuthFormState
		dispatch: AuthFormDispatch
	}
}

const Login: React.FC<Props> = ({ form }) => {
	const [, globalDispatch] = useGlobalValue()

	async function submit(): Promise<void> {
		const { status, user } = await ApiLogin(form.state.username, form.state.password)

		if (status == 401) // Not Found
			return form.dispatch({ type: 'NOT_FOUND' })

		if (status == 409) // Unathorized
			return form.dispatch({ type: 'PASS_CONFLICT' })

		successAnimation(user) // Ok
	}

	function successAnimation(user: User | any) {
		form.dispatch({ type: 'GRANT_AUTH' })

		const authLogo = document.getElementById('authLogo')
		authLogo?.classList.add('logo-anim')

		setTimeout(() => {
			authLogo?.classList.add('logo-hide')
			return globalDispatch({ type: 'GRANT_AUTH', user: user })
		}, 900)
	}

	return (
		<>
			<AuthForm
				withGoogle
				submit={submit}
				form={form} />
		</>
	)
}

export default Login