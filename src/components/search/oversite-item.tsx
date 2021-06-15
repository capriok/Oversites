import React, { useRef } from 'react'
import useOutsideClick from 'hooks/useOutsideClick'

import 'styles/search/oversite-item.scss'
import OversiteScreen from './oversite-screen'

interface Props {
	index: number
	oversite: Oversite
	seeingIndex: number
	seeMore: React.Dispatch<number>
}

const OversiteItem: React.FC<Props> = ({ index, oversite, seeingIndex, seeMore }) => {
	const isSeeingThisOversite = seeingIndex === index
	const seeingActiveNotThis = seeingIndex !== -1 && seeingIndex !== index

	const ref: any = useRef()
	useOutsideClick(ref, () => {
		if (seeingIndex === -1) return
		if (isSeeingThisOversite) return seeMore(-1)
	})

	return (
		<div
			key={index}
			ref={ref}
			className={`oversite-item ${seeingActiveNotThis ? 'fade' : ''}`}>

			<div className="item-head">
				<h3>{oversite.title}</h3>
				<p><label>Severity: </label>
					<label data-severity={oversite.severity}>{oversite.severity}</label>
				</p>
			</div>

			<div className="item-body">
				<p><label>Domain: </label>{oversite.domain.charAt(0).toUpperCase() + oversite.domain.slice(1)}</p>
				<div>
					<button
						onClick={() => seeMore(isSeeingThisOversite ? -1 : index)}
						disabled={seeingActiveNotThis}>
						{!isSeeingThisOversite ? 'See more' : 'See less'}
					</button>
				</div>
			</div>

			{isSeeingThisOversite && <>
				<div className="item-more-body">
					<p><label>Private: </label>{oversite.private ? 'Yes' : 'No'}</p>
					<p>{oversite.details.founder}</p>
				</div>
				<OversiteScreen oversite={oversite} />
			</>}
		</div>
	)
}

export default OversiteItem