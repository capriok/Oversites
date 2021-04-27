import React from 'react'
import { Route } from 'react-router-dom'
import { useGlobalValue } from 'state/global-context/state'

import OversiteCreate from './oversite-create'
import OversiteInvestigate from './oversite-investigate'

interface Props {
}

const OversiteRouter: React.FC<Props> = ({ }) => {
	const [{ user: { isAuth } }] = useGlobalValue()

	return (
		<>
			<Route exact path="/oversite/create" render={() =>
				<OversiteCreate />
			} />
			<Route exact path="/oversite/:id/investigate" render={(props) =>
				<OversiteInvestigate id={props.match.params.id} />
			} />
		</>
	)
}

export default OversiteRouter
