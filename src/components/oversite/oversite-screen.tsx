import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalValue } from 'state/global-context/state'

import 'styles/oversite/oversite-screen.scss'

interface Props {
	oversite: Oversite
}

const OversiteScreen: React.FC<Props> = ({ oversite }) => {
	const [{ user }] = useGlobalValue()

	function checkDomainOwnership() {
		if (!user.isAuth) return false

		const userDomains: string[] = user.details.domains
		const osDomain = oversite.domain
		const found = userDomains.find(uDomain => uDomain === osDomain)
		return found ? true : false
	}

	const isOwner = checkDomainOwnership()
	const isAuthed = user.isAuth

	const AccessContent = () => (
		<>
			<div>
				<p><label>Category: </label>{oversite.category}</p>
				<p><label>Descrption: </label>{oversite.description}</p>
			</div>
			<div>
				{isOwner
					? <p className="ownership">You own this domain.</p>
					: <Link to="/oversite/contact"><button>Contact Founder</button></Link>
				}
				<Link to="/oversite/contact"><button>Investigate</button></Link>
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
						<AccessContent />
					</div>
					: <div className="private-access">
						{!isOwner
							? <PrivacyScreen />
							: <AccessContent />
						}
					</div>
			}
		</div>
	)
}

export default OversiteScreen