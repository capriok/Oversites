import React, { useEffect, useReducer } from 'react'
import { searchFormState, searchFormReducer } from "state/searchReducer/reducer";

import 'styles/search/search-form.scss'
import FormResults from './form-results'

interface Props {
	websiteList: string[]
	setSearchResult: React.Dispatch<string>
	setResultLoading: React.Dispatch<boolean>
}

const SearchForm: React.FC<Props> = ({
	websiteList,
	setSearchResult,
	setResultLoading
}) => {

	const [state, dispatch] = useReducer(searchFormReducer, searchFormState)

	const { searchValue, resultsList } = state

	function findSearchValue(str: string): void {
		const search = str.toLowerCase()

		if (search.length < 1) {
			return dispatch({ type: 'RESET_FORM' })
		} else {
			dispatch({ type: 'SET_VALUE', value: search })
		}

		const tempList: string[] = []
		websiteList.some(site => {
			const website = site.slice(0, search.length)
			if (website.includes(search)) {
				tempList.push(site)
			}
		})

		dispatch({ type: 'SET_RESULTS', value: tempList.slice(0, 10) })
	}

	function selectResult(value: string): void {
		dispatch({ type: 'SELECT_RESULT', value: value })
		setResultLoading(true)
		setSearchResult(value)
	}

	useEffect(() => {
		console.log({ resultsList })
	}, [resultsList])

	return (
		<div className="search-form">
			<input
				type="text"
				id="formInput"
				className="form-input"
				value={searchValue}
				placeholder="Find a website in our database."
				onClick={() => resultsList.length > 1 && dispatch({ type: 'TOGGLE_RESULTS', value: true })}
				onChange={(e) => findSearchValue(e.target.value)} />
			<FormResults
				selectResult={selectResult}
				state={state}
				dispatch={dispatch}
			/>
		</div>
	)
}

export default SearchForm
