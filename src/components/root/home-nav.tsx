import React from 'react'
import { useGlobalValue } from 'state/state'
import { Link, RouteComponentProps } from 'react-router-dom'
import Nav from '../common/navbar'

import 'styles/common/home-nav.scss'

interface Props {
	props: RouteComponentProps
}

const HomeNav: React.FC<Props> = ({ props }) => {
	const [{ user: { au: { isAuth } } }] = useGlobalValue()

	const path = props.location.pathname.split('/').splice(1)
	if (path[0] === 'login' || path[1] === 'register') return <></>

	return (
		<Nav className="home-nav">
			<header><a href="/"><h1>Oversites.</h1></a></header>
			<div className="links">
				{isAuth
					? <>
						<section><Link to="/browse">Browse</Link></section>
						<section><Link to="/new-os">New OS</Link></section>
					</>
					: <section><Link to="/login">Login</Link></section>
				}
			</div>
		</Nav>
	)
}

export default HomeNav