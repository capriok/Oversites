import React from 'react'
import { Link } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import Nav from './navbar'

import 'styles/common/auth/auth-nav.scss'

interface Props {
	className: string
	props: RouteComponentProps
}

const AuthNav: React.FC<Props> = ({ className, props }) => {
	const registering = props.location.pathname === '/login/register'
	return (
		<Nav>
			<div className={className}>
				<a href="/" className="go-back"><span>&lt;</span> Return</a>
				<div className="links">
					{registering
						? <>
							<span>Have an account?</span>
							<Link to="/login">
								<div className="attract">Login</div>
							</Link>
						</>
						: <>
							<span>Not a member?</span>
							<Link to="/login/register">
								<div className="attract">Sign Up</div>
							</Link>
						</>
					}
				</div>
			</div>
		</Nav >
	)
}

export default AuthNav