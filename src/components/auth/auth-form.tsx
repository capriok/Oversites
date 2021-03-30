import React, { useState } from 'react'

import 'styles/auth/auth-form.scss'

import LOGO_BLACK from '../../assets/logo_black.png'

import Loader from '../common/loader'
import FormRequirements from './form/requirements'
import GoogleLog from './form/google-login'

interface Props {
	formState: AuthFormState
	formDispatch: AuthFormDispatch
	submit: () => Promise<void>
	withGoogle?: boolean
}

const AuthForm: React.FC<Props> = ({ formState, formDispatch, submit, withGoogle }) => {
	const [passwordPeeker, setPasswordPeeker] = useState({ icon: '⦿', type: 'password' })

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
				submit()
			}}>
			<h1 className="form-title">{formState.title}</h1>
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
							value={formState.username}
							onChange={(e) => {
								formDispatch({ type: 'USERNAME', value: e.target.value.replace(' ', '') })
							}} />
					</div>
					<div className="password">
						<p>Password</p>
						<div className="pass-field">
							<span id="passwordToggle" onClick={togglePass}>{passwordPeeker.icon}</span>
							<input
								id="passwordField"
								type={passwordPeeker.type}
								placeholder="Shhh.."
								required
								value={formState.password}
								onChange={(e) => {
									formDispatch({ type: 'PASSWORD', value: e.target.value.replace(' ', '') })
								}} />
						</div>
					</div>
					<button
						type="submit"
						disabled={formState.submitting ? true : false}>
						{formState.submitting ? <Loader /> : 'Submit'}
					</button>
				</div>
				<br />
				{withGoogle && <GoogleLog />}
				<FormRequirements username={formState.username} password={formState.password} />
			</div>
		</form>
	)
}

export default AuthForm
