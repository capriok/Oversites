import React, { useEffect, useState } from 'react'
import Loader from 'components/common/loader'

import 'styles/search/search-result.scss'

interface Props {
	searchResult: string
	resultLoading: boolean
	setResultLoading: React.Dispatch<boolean>
}

const SearchResult: React.FC<Props> = ({ searchResult, resultLoading, setResultLoading }) => {

	const [oversites, setOversites] = useState<Oversite[]>([])

	useEffect(() => {
		(async () => {
			const res = await fetch(process.env.REACT_APP_ENDPOINT + '/oversites' || '')
			const { data: oversites } = await res.json()
			console.log(oversites);

			setOversites(oversites)
			setTimeout(() => {
				setResultLoading(false)
			}, Math.floor(Math.random() * 3000))
		})()
	}, [resultLoading])

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
			<h1>{searchResult}</h1>
			<br />
			{resultLoading
				? <Loader />
				: <>
					{oversites.length > 0 &&
						oversites.map((os: Oversite, i) => (
							<div key={i}>
								<p>{os.title}</p>
								<p>{os.description}</p>
								{os.proof.length > 0
									? os.proof.map((buffer, i) => {
										return <img
											alt=""
											key={i}
											style={{ width: '500px', margin: '0 auto' }}
											src={'data:image/jpg;base64,' + bufferToBase64(buffer)} />
									})
									: <p>No Images.</p>
								}
							</div>
						))
					}
				</>
			}
		</div>
	)
}

export default SearchResult
