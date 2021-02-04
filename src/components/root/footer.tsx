import React from 'react'

import 'styles/root/footer.scss'

interface Props {

}

const Footer: React.FC<Props> = ({ }) => {
	return (
		<footer className="footer">
			<main>
				<h1>Oversites.</h1>
			</main>
			<main>
				<section>Content to be determined</section>
				<section>{new Date().getFullYear()} | All rights reserved.</section>
			</main>
		</footer>
	)
}

export default Footer