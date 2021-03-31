import React from 'react'
import { Link } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import Nav from '../common/navbar'

import 'styles/auth/auth-nav.scss'

interface Props {
	props: RouteComponentProps
}

const AuthNav: React.FC<Props> = ({ props }) => {
	const isAtRegister = props.location.pathname === '/register'

	return (
		<Nav className="auth-nav">
			<header>
				<a href="/" className="go-back"><span>&lt;</span> Return</a>
			</header>
			<div className="links">
				<section>
					<span>{isAtRegister ? 'Have an account?' : 'Not a member?'}</span>
					<Link to={!isAtRegister ? '/register' : '/login'} className="link">
						<div className="attract">{isAtRegister ? 'Login' : 'Sign Up'}</div>
					</Link>
				</section>
			</div>
		</Nav>
	)
}

export default AuthNav