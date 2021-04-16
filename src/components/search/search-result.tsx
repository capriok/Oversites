import React, { useEffect, useState } from 'react'
import { FetchOversites, RevokeToken } from '../../api/os'

import Loader from 'components/common/loader'

import 'styles/search/search-result.scss'
import { useGlobalValue } from 'state/global-context/state'

interface Props {
	searchResult: string
	resultLoading: boolean
	setResultLoading: React.Dispatch<boolean>
}

const SearchResult: React.FC<Props> = ({
	searchResult,
	resultLoading,
	setResultLoading
}) => {

	const [oversites, setOversites] = useState<Oversite[]>([])

	const [{ user }, dispatch] = useGlobalValue()

	useEffect(() => {
		(async () => {
			const { status, oversites } = await FetchOversites(user.userId, searchResult)
			console.log({ Oversites: oversites })

			setOversites(oversites)

			setTimeout(() => {
				setResultLoading(false)
			}, Math.floor(Math.random() * 3000))
		})()
	}, [searchResult])

	useEffect(() => {
		if (oversites.length > 0) console.log({ Oversites: oversites })
	}, [oversites])

	function bufferToBase64(buffer: object | any) {
		return btoa(
			buffer.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
		)
	}

	return (
		<div className="search-result">
			<h1 className="result-title">
				{searchResult.charAt(0).toUpperCase() + searchResult.slice(1)}
			</h1>
			<br />
			{resultLoading
				? <><br /><Loader /></>
				: <>
					{oversites.length > 0
						? oversites.map((os, i) => (
							<div
								key={i}
								className="result-item">
								<div className="item-head">
									<h3>{os.title}</h3>
									<h3>Username</h3>
								</div>
								<p>Severity: {os.serverity}</p>
								<div className="item-foot">
									<span>{os.category}</span>
									<button>Investigate</button>
								</div>

								{/* {os.proof.length > 0
									? os.proof.map((buffer, i) => (
										<img
											alt=""
											key={i}
											style={{ width: '500px', margin: '0 auto' }}
											src={'data:image/jpg;base64,' + bufferToBase64(buffer)} />
									))
									: <p>No Images.</p>
								} */}
							</div>
						))
						: <p className="results-empty">There doesnt seem to be any oversights.</p>
					}
				</>
			}
		</div>
	)
}

export default SearchResult
