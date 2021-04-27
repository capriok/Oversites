import React, { useEffect, useState } from 'react'
import OsApi from 'api/os-api'

import 'styles/search/search-result.scss'
import { useGlobalValue } from 'state/global-context/state'
import OversiteList from './oversite-list'

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

	const [searchResultOversites, setSearchResultOversites] = useState<Oversite[]>([])

	const [{ user }] = useGlobalValue()

	useEffect(() => {
		(async () => {
			const { oversites: fetchedOversites } = await OsApi.FetchSearchResultOversites(user.id, searchResult)
			console.log({ Oversites: fetchedOversites })

			setSearchResultOversites(fetchedOversites)

			setTimeout(() => {
				setResultLoading(false)
			}, Math.floor(Math.random() * 3000))
		})()
	}, [searchResult, resultLoading])

	useEffect(() => {
		if (searchResultOversites.length > 0) console.log({ Oversites: searchResultOversites })
	}, [searchResultOversites])

	return (
		<div className="search-result">
			<h1 className="result-list-title">
				{searchResult.charAt(0).toUpperCase() + searchResult.slice(1)}
			</h1>

			<OversiteList
				loading={resultLoading}
				oversites={searchResultOversites} />
		</div>
	)
}

export default SearchResult
