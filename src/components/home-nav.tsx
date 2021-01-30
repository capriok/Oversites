import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './navbar'

interface Props {

}

const HomeNav: React.FC<Props> = () => {
	return (
		<Nav>
			<h1><a href="/">Oversites.</a></h1>
			<div className="links">
				<div><Link to="/login">Login</Link></div>
			</div>
		</Nav>
	)
}

export default HomeNav