import React from 'react'

import 'styles/common/loader.scss'

interface Props {
	centered?: boolean
}

const Loader: React.FC<Props> = ({ centered }) => (
	<div
		className="wrapper"
		style={
			centered ?
				{ position: 'absolute', top: '50vh', left: '50vw' }
				: {}
		}>
		<div className="loading">
			<span className="loader"></span>
			<span className="loader"></span>
			<span className="loader"></span>
		</div>
	</div>
)

export default Loader