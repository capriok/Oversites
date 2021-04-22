import React from 'react'

import 'styles/root/footer.scss'

interface Props {

}

const Footer: React.FC<Props> = ({ }) => {
	return (
		<footer className="footer">
			<main>
				<div>
					<h1>Oversites.</h1>
				</div>

				<div>
					<section>{new Date().getFullYear()} | All rights reserved.</section>
				</div>
			</main>
		</footer>
	)
}

export default Footer