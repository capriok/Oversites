import React, { useState, useEffect } from 'react'
import { uniq } from 'lodash'

import 'styles/search/search.scss'

import websites from 'assets/data/websites.json'
import SearchForm from 'components/search/search-form'
import SearchResult from 'components/search/search-result'

interface Props {
}

const Search: React.FC<Props> = () => {

	const [websiteList, setWebsiteList] = useState<string[]>([])
	const [searchResult, setSearchResult] = useState<string>('')
	const [resultLoading, setResultLoading] = useState<boolean>(false)

	function parseLocalDataset(): string[] {
		let arr: string[] = []

		for (const website of websites) {
			const siteName = website["Site"]
			const validDotcom = siteName.slice(siteName.length - 4) === '.com'
			if (validDotcom) arr.push(siteName.toLocaleLowerCase())
		}

		return uniq(arr)
	}

	useEffect(() => {
		const siteList = parseLocalDataset()
		console.log({ Websites: siteList })
		setWebsiteList(siteList)
	}, [])

	return (
		<div className="search">
			<h1>Search for Oversites</h1>
			<SearchForm
				websiteList={websiteList}
				setSearchResult={setSearchResult}
				setResultLoading={setResultLoading} />
			{searchResult &&
				<SearchResult
					searchResult={searchResult}
					resultLoading={resultLoading}
					setResultLoading={setResultLoading} />}
		</div>
	)
}

export default Search
