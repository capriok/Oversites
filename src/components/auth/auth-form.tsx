import React, { useEffect, useState } from 'react'

import 'styles/auth/auth-form.scss'

import LOGO_BLACK from 'assets/logo_black.png'

import Loader from '../common/loader'
import FormRequirements from './form/requirements'
import GoogleLog from './form/google-login'

interface Props {
	form: {
		state: AuthFormState
		dispatch: React.Dispatch<AuthFormReducer>
	}
	submit: () => Promise<void>
	withGoogle?: boolean
	withReqs?: boolean
}

const AuthForm: React.FC<Props> = ({ form, submit, withGoogle, withReqs }) => {
	const { state, dispatch } = form

	const [passwordPeeker, setPasswordPeeker] = useState({ icon: '⦿', type: 'password' })

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		dispatch({
			type: 'FIELDS',
			values: {
				username, password
			}
		})
	}, [username, password])


	useEffect(() => {
		setUsername(form.state.username)
		setPassword(form.state.password)
	}, [form.state.username, form.state.password])

	function validatedFormFields() {
		if (username.length < 3) return false
		if (!new RegExp(/^[0-9a-zA-Z]+$/).test(username)) return false
		if (password.length < 3) return false
		return true
	}

	function togglePass() {
		passwordPeeker.type === 'password'
			? setPasswordPeeker({
				icon: '⦾',
				type: 'text'
			})
			: setPasswordPeeker({
				icon: '⦿',
				type: 'password'
			})
	}

	return (
		<form className="auth-form"
			onSubmit={(e) => {
				e.preventDefault()
				form.dispatch({ type: 'SUBMITTING' })
				submit().finally(() => dispatch({ type: 'SET_FORM' }))
			}}>
			<h1 className="form-title">{state.title}</h1>
			<div className="image-cont">
				<img draggable={false} id="authLogo" src={LOGO_BLACK} alt="" className="logo" />
			</div>
			<div className="form-cont">
				<div className="fields">
					<div className="username">
						<p>Username</p>
						<input
							id="usernameField"
							type="text"
							placeholder="Karen"
							required
							value={username}
							onChange={(e) => {
								setUsername(e.target.value.replace(' ', ''))
							}} />
					</div>
					<div className="password">
						<p>Password</p>
						<div className="pass-field">
							<span id="passwordToggle" onClick={togglePass}>
								{passwordPeeker.icon}
							</span>
							<input
								id="passwordField"
								type={passwordPeeker.type}
								placeholder="Shhh.."
								required
								value={password}
								onChange={(e) => {
									setPassword(e.target.value.replace(' ', ''))
								}} />
						</div>
					</div>
					<button
						type="submit"
						disabled={
							state.submitting
								? true
								: validatedFormFields()
									? false
									: true
						}>
						{state.submitting ? <Loader /> : 'Submit'}
					</button>
				</div>
				<br />
				{withGoogle && <GoogleLog />}
				{withReqs && <FormRequirements
					username={username}
					password={password} />}
			</div>
		</form>
	)
}

export default AuthForm
