import React from 'react'
import { useGlobalValue } from 'state/state'
import { Link, RouteComponentProps } from 'react-router-dom'
import Nav from '../common/navbar'

import 'styles/root/home-nav.scss'

interface Props {
	props: RouteComponentProps
}

const HomeNav: React.FC<Props> = ({ props }) => {
	const [{ user: { isAuth } }, dispatch] = useGlobalValue()

	const isAtLogin = props.location.pathname === '/login'
	const isAtRegister = props.location.pathname === '/register'

	if (isAtLogin || isAtRegister) return <></>

	return (
		<Nav className="home-nav">
			<header><a href="/"><h1>Oversites.</h1></a></header>
			<div className="links">
				{isAuth
					? <>
						<section><Link to="/search">Search</Link></section>
						<section><Link to="/compose">New Oversite</Link></section>
						<section><Link to="" onClick={() => dispatch({ type: "REVOKE_AUTH" })}>Logout</Link></section>
					</>
					: <>
						<section><Link to="/search">Search</Link></section>
						<section><Link to="/login">Login</Link></section>
					</>
				}
			</div>
		</Nav>
	)
}

export default HomeNav