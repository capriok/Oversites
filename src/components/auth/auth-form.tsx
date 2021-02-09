import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import { useGlobalValue } from 'state/state'

import 'styles/auth/auth-form.scss'
import 'styles/auth/auth-reqs.scss'

import LOGO_BLACK from '../../assets/logo_black.png'
import G_ICON from '../../assets/google_icon.png'

import Loader from '../common/loader'

interface Props {
	props: RouteComponentProps
}

interface AuthForm {
	title: string
	username: string
	password: string
	submitting: boolean
}

const AuthForm: React.FC<Props> = ({ props }) => {
	const path = props.location.pathname

	const subpath = path.split('/')[2]
	const noSubPath = subpath === undefined || subpath.length <= 0

	const validSubPath = path.split('/')[2] === 'register'
	if (!noSubPath && !validSubPath) window.location.href = '/login'

	const isReg = path === '/login/register'

	const [, dispatch] = useGlobalValue()

	const [form, setForm] = useState<AuthForm>({
		title: '',
		username: 'kyle',
		password: 'admin',
		submitting: false
	})

	useEffect(() => {
		setForm(form => {
			return {
				...form,
				title: isReg ? 'Register' : 'Login'
			}
		})
	}, [path])

	async function authLog(fwd = false): Promise<void> {
		const res = await fetch(process.env.REACT_APP_ENDPOINT + '/login', {
			method: 'POST',
			'credentials': 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: form.username, password: form.password }),
		})
		const { data: user, status, message } = await res.json()
		console.log({ User: user })

		if (fwd === false) {
			setForm(form => {
				return {
					...form,
					title: message
				}
			})
		}
		switch (status) {
			case 400: // No Account
				setForm(form => {
					return {
						...form,
						username: '',
						password: '',
						submitting: false
					}
				})
				break;
			case 401: // Incorrect Password
				setForm(form => {
					return {
						...form,
						password: '',
						submitting: false
					}
				})
				break;
			case 200: // Authenticated
				const authLogo = document.getElementById('authLogo')
				if (authLogo) {
					authLogo.classList.add('logo-anim')
					const hideDelay = setTimeout(() => {
						authLogo.classList.add('logo-hide')
						clearTimeout(hideDelay)
						localStorage.setItem('OS_USERAUTH', JSON.stringify({ isAuth: true }))
						dispatch({
							type: 'USER_AUTH',
							payload: {
								...user,
								au: {
									...user.au,
									isAuth: true
								}
							}
						})
					}, 900)
				}
				setForm(form => {
					return {
						...form,
						submitting: false
					}
				})
				break;
			default:
				break;
		}
	}

	async function authNew(): Promise<void> {
		const res = await fetch(process.env.REACT_APP_ENDPOINT + '/register',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username: form.username, password: form.password }),
			}
		)
		let data = await res.json()
		console.log(data)

		setForm(form => {
			return {
				...form,
				title: data.message
			}
		})
		switch (data.status) {
			case 409: // User Already Exists
				setForm(form => {
					return {
						...form,
						username: '',
						password: '',
						submitting: false
					}
				})
				break;
			case 200: // Account Created
				authLog(true)
				break;
			default:
				break;
		}
	}

	async function gSuccess(res: object): Promise<void> {
		console.log('Success')
		console.log(res)
	}
	async function gFailure(err: object): Promise<void> {
		console.log('Failure')
		console.log(err)
	}

	function validateFields() {
		let bool = true

		const uCheck = document.getElementById('usernameCheck')
		const pCheck = document.getElementById('passwordCheck')

		const AtoZ = new RegExp(/^[0-9a-zA-Z]+$/)
		const onlyAtoZ = AtoZ.test(form.username)

		if (uCheck) {
			if (form.username.length >= 3 && onlyAtoZ) {
				uCheck.classList.add('label-check-show')
			} else {
				uCheck.classList.remove('label-check-show')
				bool = false
			}
		}
		if (pCheck) {
			if (form.password.length >= 3) {
				pCheck.classList.add('label-check-show')
			} else {
				pCheck.classList.remove('label-check-show')
				bool = false
			}
		}
		return bool
	}

	useEffect(() => {
		validateFields()
	}, [form.username, form.password])

	function togglePass() {
		const pField = document.getElementById('passwordField')
		const pToggle = document.getElementById('passwordToggle')
		if (pField) {
			const hidden = pField.getAttribute('type') === 'password'
			if (pToggle) {
				if (hidden) {
					pToggle.innerText = '⦾'
					pField.setAttribute('type', 'text')
				} else {
					pToggle.innerText = '⦿'
					pField.setAttribute('type', 'password')
				}
			}
		}
	}

	return (
		<form className="auth-form"
			onSubmit={(e) => {
				e.preventDefault()
				setForm({
					...form,
					submitting: true
				})
				isReg ? authNew() : authLog()
			}}>
			<h1 className="form-title">{form.title}</h1>
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
							value={form.username} onChange={(e) => {
								setForm({ ...form, username: e.target.value.replace(' ', '') })
							}} />
					</div>
					<div className="password">
						<p>Password</p>
						<div className="pass-field">
							<span id="passwordToggle" onClick={togglePass} >⦿</span>
							<input
								id="passwordField"
								type="password"
								placeholder="Shhh.."
								required
								value={form.password} onChange={(e) => {
									setForm({ ...form, password: e.target.value })
								}} />
						</div>
					</div>
					<button type="submit" disabled={
						!validateFields()
							? true
							: form.submitting ? true : false
					}>
						{form.submitting ? <Loader /> : 'Submit'}
					</button>
				</div>
				<br />
				{!isReg && <>
					<p>Sign in with Google (soon)</p>
					<GoogleLogin
						clientId={process.env.REACT_APP_GOOGLECID || ''}
						onSuccess={gSuccess}
						onFailure={gFailure}
						cookiePolicy={'single_host_origin'}
						render={renderProps => (
							<button disabled style={gButton} onClick={renderProps.onClick}>
								<img src={G_ICON} alt="" style={gButton.img} />
								Google Login
							</button>
						)}
					/>
					<br />
					<br />
				</>}
				<div className="requirements">
					<h3>Requirements</h3>
					<div className="req-label">
						<p>Username</p>
						<span id="usernameCheck" className="label-check">&#x2714;</span>
					</div>
					<ul>
						<li>3 Charatcer Minimum</li>
						<li>a-z, A-Z, 0-9 only</li>
					</ul>
					<div className="req-label">
						<p>Password</p>
						<span id="passwordCheck" className="label-check">&#x2714;</span>
					</div>
					<ul>
						<li>3 Charatcer Minimum</li>
					</ul>
				</div>
			</div>
		</form>
	)
}

export default AuthForm

const gButton = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '10px 20px',
	width: '100%',
	minHeight: '40px',
	img: {
		width: '20px',
		marginRight: '20px',
	}
}