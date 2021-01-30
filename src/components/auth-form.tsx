import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import GoogleLogin from 'react-google-login'

import { useGlobalValue } from 'state/state'

import LOGO_BLACK from '../assets/logo_black.png'
import G_ICON from '../assets/google_icon.png'

import 'styles/common/auth/auth-form.scss'

interface Props {
	props: RouteComponentProps
}

interface AuthForm {
	title: string
	username: string
	password: string
}

interface User {
}

const AuthForm: React.FC<Props> = ({ props }) => {
	const path = props.location.pathname

	const subpath = path.split('/')[2]
	const noSubPath = subpath === undefined || subpath.length <= 0

	const validSubPath = path.split('/')[2] === 'register'
	if (!noSubPath && !validSubPath) window.location.href = '/login/'

	const isReg = path === '/login/register'

	const [, dispatch] = useGlobalValue()

	const [form, setForm] = useState<AuthForm>({
		title: '',
		username: '',
		password: ''
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

		let url = new URL(process.env.REACT_APP_ENDPOINT + '/user:')
		url.search = `username=${form.username}&password=${form.password}`

		const res = await fetch(url.toString())
		const { data, data: user, status, message } = await res.json()
		console.log(data);

		if (fwd === false) {
			setForm(form => {
				return {
					...form,
					title: message
				}
			})
		}
		switch (status) {
			case 400:
				setForm(form => {
					return {
						...form,
						username: '',
						password: ''
					}
				})
				alert("Click Sign Up to Register an Account?")
				break;
			case 401:
				setForm(form => {
					return {
						...form,
						password: ''
					}
				})
				break;
			case 200:

				localStorage.setItem('OS-UserToken', user.token)
				dispatch({
					type: 'AUTH',
					payload: {
						...user,
					}
				})

				// window.location.href = '/'
				break;
			default:
				break;
		}
	}

	async function authNew(): Promise<void> {
		const res = await fetch(process.env.REACT_APP_ENDPOINT + '/user' || '',
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
			case 200:
				authLog(true)
				break;
			default:
				break;
		}
	}

	useEffect(() => {
	}, [])

	async function gSuccess(res: object): Promise<void> {
		console.log('Success')
		console.log(res)
	}
	async function gFailure(err: object): Promise<void> {
		console.log('Failure')
		console.log(err)
	}

	function togglePass() {
		const authPass = document.getElementById('authpass')
		const passEye = document.getElementById('passEye')
		if (authPass) {
			const hidden = authPass.getAttribute('type') === 'password'
			if (passEye) {
				if (hidden) {
					passEye.innerText = '⦾'
					authPass.setAttribute('type', 'text')
				} else {
					passEye.innerText = '⦿'
					authPass.setAttribute('type', 'password')
				}
			}
		}
	}

	return (
		<form className="auth-form"
			onSubmit={(e) => { e.preventDefault(); isReg ? authNew() : authLog() }}>
			<h1 className="form-title">{form.title}</h1>
			<div className="form-cont">
				<div className="image-cont">
					<img src={LOGO_BLACK} alt="" className="logo" />
				</div>
				<div className="fields">
					<div className="username">
						<label>Username</label>
						<input
							type="text"
							placeholder="Karen"
							autoFocus
							required
							value={form.username} onChange={(e) => {
								setForm({ ...form, username: e.target.value })
							}} />
					</div>
					<div className="password">
						<label>Password</label>
						<div>
							<span id="passEye" onClick={togglePass} >⦿</span>
							<input
								id="authpass"
								type="password"
								placeholder="Shhh.."
								required
								value={form.password} onChange={(e) => {
									setForm({ ...form, password: e.target.value })
								}} />
						</div>
					</div>
					<button type="submit">Submit</button>
				</div>
				<br />
				<p>Sign in with Google (soon)</p>
				<GoogleLogin
					clientId={process.env.REACT_APP_GOOGLECID || ''}
					onSuccess={gSuccess}
					onFailure={gFailure}
					cookiePolicy={'single_host_origin'}
					render={renderProps => (
						<button disabled className="custom-google" style={customGoogle} onClick={renderProps.onClick}>
							<img src={G_ICON} alt="" style={customGoogle.img} />
							Google Login
						</button>
					)}
				/>
			</div>
		</form>
	)
}

export default AuthForm

const customGoogle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '10px 20px',
	img: {
		width: '20px',
		marginRight: '20px',
	}
}