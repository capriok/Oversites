import React, { useState } from 'react'

import Loader from 'components/common/loader'

import 'styles/oversite/oversite-list.scss'
import OversiteItem from './oversite-item'

interface Props {
	loading: boolean
	oversites: Oversite[]
}

const OversiteList: React.FC<Props> = ({ loading, oversites }) => {
	const [seeingIndex, seeMore] = useState(-1)

	return (
		<>
			{loading
				? <div className="result-loader"><Loader /></div>
				: <>
					{oversites.length > 0
						? oversites.map((os, i) => (
							<OversiteItem
								key={i}
								i={i}
								oversite={os}
								seeingIndex={seeingIndex}
								seeMore={seeMore} />
						))
						: <p className="os-list-empty">There doesnt seem to be any oversights.</p>
					}
				</>
			}
		</>
	)
}

export default OversiteList