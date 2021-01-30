import React from 'react'

import "styles/common/navbar.scss"

interface Props {
	children: React.ReactNode
}

const Nav: React.FC<Props> = ({ children }) => (
	<nav className="navbar">
		{children}
	</nav>
)

export default Nav