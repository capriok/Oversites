import React from 'react'

import "styles/common/navbar.scss"

interface Props {
	className?: string
	children: React.ReactNode
}

const Nav: React.FC<Props> = ({ className, children }) => (
	<nav className={`navbar ${className}`}>
		{children}
	</nav>
)

export default Nav