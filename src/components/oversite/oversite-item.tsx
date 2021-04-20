import React, { useRef } from 'react'

import useOutsideClick from 'hooks/useOutsideClick'

import 'styles/oversite/oversite-item.scss'
import OversiteScreen from './oversite-screen'

interface Props {
	i: number
	oversite: Oversite
	seeingIndex: number
	seeMore: React.Dispatch<number>
}

const OversiteItem: React.FC<Props> = ({ i, oversite, seeingIndex, seeMore }) => {
	const isSeeingThisOversite = seeingIndex === i
	const seeingActiveNotThis = seeingIndex !== -1 && seeingIndex !== i

	const ref: any = useRef()
	useOutsideClick(ref, () => {
		if (seeingIndex === -1) return
		if (isSeeingThisOversite) return seeMore(-1)
	})

	// function bufferToBase64(buffer: object | any) {
	// 	return btoa(
	// 		buffer.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
	// 	)

	// 	{oversite.sights.length > 0
	// 		? oversite.sights.map(({ data: buffer }, i) => (
	// 			<span key={i}>image</span>
	// 			// <img
	// 			// 	alt=""
	// 			// 	key={i}
	// 			// 	style={{ width: '500px', margin: '0 auto' }}
	// 			// 	src={'data:image/jpg;base64,' + bufferToBase64(buffer)} />
	// 		))
	// 		: <p>No Images.</p>
	// 	}
	// }

	return (
		<div
			key={i}
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
						onClick={() => seeMore(isSeeingThisOversite ? -1 : i)}
						disabled={seeingActiveNotThis}>
						{!isSeeingThisOversite ? 'See more' : 'See less'}
					</button>
				</div>
			</div>

			{isSeeingThisOversite && <>
				<div className="item-more-body">
					<p><label>Private: </label>{oversite.private ? 'Yes' : 'No'}</p>
					<p>oversite.founder</p>
				</div>
				<OversiteScreen oversite={oversite} />
			</>}
		</div>
	)
}

export default OversiteItem