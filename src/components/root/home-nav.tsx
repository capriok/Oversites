import React from 'react'
import { useGlobalValue } from 'state/state'
import { Link } from 'react-router-dom'
import Nav from '../common/navbar'

import 'styles/common/home-nav.scss'

interface Props {

}

const HomeNav: React.FC<Props> = () => {
	const [{ user: { au: { isAuth } } }] = useGlobalValue()

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