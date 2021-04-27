import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalValue } from 'state/global-context/state'

import 'styles/search/oversite-screen.scss'

interface Props {
	oversite: Oversite
}

const OversiteScreen: React.FC<Props> = ({ oversite }) => {
	const [{ user }] = useGlobalValue()

	function checkDomainOwnership() {
		if (!user.isAuth) return false

		const userDomains = user.details.domains
		const osDomain = oversite.domain

		const found = userDomains.find(uD => uD.domain === osDomain)
		return found ? true : false
	}

	const isOwner = checkDomainOwnership()
	const isAuthed = user.isAuth

	const AccessContent = ({ index }) => (
		<>
			<div>
				<p><label>Category: </label>{oversite.details.category}</p>
				<p><label>Descrption: </label>{oversite.details.description}</p>
			</div>
			<div>
				{isOwner
					? <p className="ownership">You own this domain.</p>
					: <Link to={`/oversite/${index}/contact`}><button>Contact Founder</button></Link>
				}
				<Link to={`/oversite/${index}/investigate`}><button>Investigate</button></Link>
			</div>
		</>
	)

	const PrivacyScreen = () => (
		<>
			<Link
				className="panel"
				to="/oversite/contact">
				Access limited, contact founder.
							</Link>
			<Link
				className="panel"
				to={isAuthed ? "/login" : "/account/domains"}>
				{isAuthed
					? 'Claim domain ownership.'
					: 'Login to confirm domain ownership.'
				}
			</Link>
		</>
	)

	return (
		<div className="oversite-screen">
			{
				!oversite.private
					? <div className="public-access">
						<AccessContent index={oversite.id} />
					</div>
					: <div className="private-access">
						{!isOwner
							? <PrivacyScreen />
							: <AccessContent index={oversite.id} />
						}
					</div>
			}
		</div>
	)
}

export default OversiteScreen