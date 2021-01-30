import React from 'react'
import "styles/root/layout.scss"

interface Props {
	children: React.ReactNode
}

const MainLayout: React.FC<Props> = ({ children }) => (
	<div className="layout">
		{children}
	</div>
)

export default MainLayout