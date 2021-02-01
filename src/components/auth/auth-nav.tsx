import React from 'react'
import { Link } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import Nav from '../common/navbar'

import 'styles/common/auth/auth-nav.scss'

interface Props {
	props: RouteComponentProps
}

const AuthNav: React.FC<Props> = ({ props }) => {
	const registering = props.location.pathname === '/login/register'
	return (
		<Nav className="auth-nav">
			<header>
				<a href="/" className="go-back"><span>&lt;</span> Return</a>
			</header>
			<div className="links">
				{registering
					? <>
						<section>
							<span>Have an account?</span>
							<Link to="/login" className="link">
								<div className="attract">Login</div>
							</Link>
						</section>
					</>
					: <>
						<section>
							<span>Not a member?</span>
							<Link to="/login/register">
								<div className="attract">Sign Up</div>
							</Link>
						</section>
					</>
				}
			</div>
		</Nav >
	)
}

export default AuthNav