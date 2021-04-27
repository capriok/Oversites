import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useGlobalValue } from 'state/global-context/state'
import OsApi from 'api/os-api'

import Loader from 'components/common/loader'

import 'styles/oversite/oversite-investigate.scss'
import 'styles/common/route-title.scss'

interface Props {
	id: string
}

const OversiteInvestigate: React.FC<Props> = ({ id }) => {
	const oversiteId = parseInt(id)

	const [{ user }] = useGlobalValue()

	const [loading, setLoading] = useState<boolean>(true)
	const [oversite, setOversite] = useState<Oversite>({
		id: 0,
		title: '',
		domain: '',
		severity: '',
		private: false,
		details: {
			description: '',
			category: '',
			sights: []
		}
	})

	async function FetchOversite() {
		const { oversite } = await OsApi.GetOneOversite(user.userId, oversiteId)

		console.log({ Oversite: oversite })

		setLoading(false)
		setOversite(oversite)
	}

	useEffect(() => {
		if (isNaN(oversiteId)) return
		FetchOversite()
	}, [])

	if (isNaN(oversiteId)) return <Redirect to="" />

	if (loading) return <Loader centered />

	return (
		<div className="oversite-investigate">
			<h1 className="route-title">Investigate</h1>
			<div className="investigate-grid">
				<div className="gi title">
					<p><label className="gi-label">Title: </label>{oversite.title}</p>
				</div>
				<div className="gi domain">
					<p><label className="gi-label">Domain: </label>{oversite.domain}</p>
				</div>
				<div className="gi founder">
					<p><label className="gi-label">Founder: </label>{oversite.details.founder}</p>
				</div>
				<div className="gi private">
					<p><label className="gi-label">Private: </label>{oversite.private}</p>
				</div>
				<div className="gi severity">
					<p><label className="gi-label">Severity: </label>{oversite.severity}</p>
				</div>
				<div className="gi description">
					<p><label className="gi-label">Description: </label>{oversite.details.description}</p>
				</div>
				<div className="gi category">
					<p><label className="gi-label">Category: </label>{oversite.details.category}</p>
				</div>
				<div className="gi gi-pop sights">
					{oversite.details.sights.length > 0
						? oversite.details.sights.map(({ data }, i) => (
							<div className="sight-cont" key={i}>
								<img
									alt=""
									key={i}
									className="sight"
									src={"data:image/jpg;base64," + data} />
							</div>
						))
						: <p>No Sights.</p>
					}
				</div>

				<div className="gi gi-pop sightOptions">
					<ul>
						<li>Expand</li>
						<li>Download</li>
						<li>Submit Correction</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default OversiteInvestigate