import React, { useState, useEffect, useRef, useReducer } from 'react'
import useOutsideClick from 'utils/useOutsideClick'

import 'styles/search/search-form.scss'

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

	const [{ searchValue, resultsOpen, resultsList }, dispatch] = useReducer(searchFormReducer, searchFormState)

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

		dispatch({ type: 'SET_RES', value: tempList })
	}

	function selectResult(i: number): void {
		dispatch({
			type: 'SELECT_RES',
			value: {
				searchValue: resultsList[i],
				resultsList: []
			}
		})
		setResultLoading(true)
		setSearchResult(resultsList[i])
	}

	const ref: any = useRef();
	useOutsideClick(ref, () => {
		if (resultsOpen) dispatch({ type: 'TOGGLE_RESULTS', value: false })
	});

	useEffect(() => {
		console.log({ resultsList })
	}, [resultsList])

	return (
		<div className="search-form">
			<input
				type="text"
				className="form-input"
				value={searchValue}
				placeholder="Find a website in our database."
				onClick={() => resultsList.length > 1 && dispatch({ type: 'TOGGLE_RESULTS', value: true })}
				onChange={(e) => findSearchValue(e.target.value)} />
			{resultsOpen && resultsList.length > 0 &&
				<div className="form-results" ref={ref}>
					{resultsList.map((res, i) => (
						<div
							key={i}
							className="form-result"
							onClick={() => selectResult(i)}>
							{res}
						</div>
					))}
				</div>
			}
		</div>
	)
}

export default SearchForm

const searchFormState: SearchFormState = {
	searchValue: "",
	resultsOpen: false,
	resultsList: ['Loading...']
}

const searchFormReducer = (state: SearchFormState, action: any) => {
	switch (action.type) {
		case "SET_VALUE":
			return {
				...state,
				searchValue: action.value,
				resultsOpen: true
			}
		case "SET_RES":
			return {
				...state,
				resultsList: action.value,
				resultsOpen: true
			}
		case "TOGGLE_RESULTS":
			return {
				...state,
				resultsOpen: action.value
			}
		case "SELECT_RES":
			return {
				...state,
				...action.value
			}
		case "RESET_FORM":
			return {
				...searchFormState
			}
		default:
			break;
	}
}
