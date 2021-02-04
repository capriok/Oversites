import React from 'react'
import Footer from 'components/root/footer'

interface Props {
	children: React.ReactNode
}

const MainLayout: React.FC<Props> = ({ children }) => (
	<div className="app">
		<div className="layout">
			{children}
		</div>
		<Footer />
	</div>
)

export default MainLayout