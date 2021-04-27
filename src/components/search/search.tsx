import React, { useState, useEffect } from 'react'
import { uniq } from 'lodash'
import OsApi from 'api/os-api'

import 'styles/search/search.scss'
import 'styles/common/route-title.scss'

import websites from 'assets/data/websites.json'
import SearchForm from 'components/search/search-form'
import SearchResult from 'components/search/search-result'
import { useGlobalValue } from 'state/global-context/state'
import OversiteList from './oversite-list'

interface Props {
}

const Search: React.FC<Props> = () => {

	const [{ user: id }] = useGlobalValue()

	const [websiteList, setWebsiteList] = useState<string[]>([])
	const [searchResult, setSearchResult] = useState<string>('')
	const [searchResultOsListLoading, setSearchResultOsListLoading] = useState<boolean>(false)

	const [recentOsList, setRecentOsList] = useState<Oversite[]>([])
	const [recentOsListLoading, setRecentOsListLoading] = useState<boolean>(true)

	function parseLocalDataset(): string[] {
		let arr: string[] = []

		for (const website of websites) {
			const siteName = website["Site"]
			const validDotcom = siteName.slice(siteName.length - 4) === '.com'
			if (validDotcom) arr.push(siteName.toLocaleLowerCase())
		}

		return uniq(arr)
	}

	async function FetchRecentOversites() {
		const { oversites } = await OsApi.FetchRecentlyFoundedOversites(id)
		console.log({ Oversites: oversites });

		oversites.sort((a, b) => {
			const levels = ['No Effect', 'Low', 'Moderate', 'High', 'Critical']

			let aSev = levels.findIndex(level => level === a.severity) + 1
			let bSev = levels.findIndex(level => level === b.severity) + 1

			return bSev - aSev
		})

		setRecentOsListLoading(false)
		setRecentOsList(oversites)
	}

	useEffect(() => {
		const siteList = parseLocalDataset()
		console.log({ Websites: siteList })
		setWebsiteList(siteList);

		FetchRecentOversites()
	}, [])

	return (
		<div className="search">
			<h1 className="route-title">Search for Oversights</h1>
			<SearchForm
				websiteList={websiteList}
				setSearchResult={setSearchResult}
				setResultLoading={setSearchResultOsListLoading} />

			{searchResult &&
				<SearchResult
					searchResult={searchResult}
					resultLoading={searchResultOsListLoading}
					setResultLoading={setSearchResultOsListLoading} />
			}

			<div className="recent-os-list-title">
				<p>Recently Found</p>
			</div>
			<OversiteList loading={recentOsListLoading} oversites={recentOsList} />
		</div>
	)
}

export default Search
