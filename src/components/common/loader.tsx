import React from 'react'

import 'styles/common/loader.scss'

interface Props {

}

const Loader: React.FC<Props> = ({ }) => (
	<div className="wrapper">
		<div className="loading">
			<span className="loader"></span>
			<span className="loader"></span>
			<span className="loader"></span>
		</div>
	</div>
)

export default Loader