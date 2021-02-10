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

	const [{
		searchValue,
		resultsOpen,
		resultsList,
		activeResult
	}, dispatch] = useReducer(searchFormReducer, searchFormState)

	const resultsRef: any = useRef()
	useOutsideClick(resultsRef, () => {
		const DOMinput = document.getElementById('formInput')
		if (DOMinput) {
			if (document.activeElement === DOMinput) return
			if (resultsOpen) dispatch({ type: 'TOGGLE_RESULTS', value: false })
		}
	})

	useEffect(() => {
		document.addEventListener('keydown', (e: KeyboardEvent): void => {
			const ARROWUP = e.code === "ArrowUp"
			const ARROWDOWN = e.code === "ArrowDown"
			const ENTER = e.code === "Enter"
			const DOMInput = document.getElementById('formInput')
			const DOMResult = document.getElementById('activeResult')
			if (DOMInput) {
				if (ARROWDOWN) {
					DOMInput.blur()
					return dispatch({ type: 'ACTIVE_RESULT_INC' })
				} else if (ARROWUP) {
					return dispatch({ type: 'ACTIVE_RESULT_DEC' })
				} else if (ENTER) {
					if (DOMResult) {
						return selectResult(DOMResult.textContent || '')
					}
				}
			}
		})
		return () => document.removeEventListener('keydown', () => { })
	}, [])

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

	useEffect(() => {
		const DOMInput = document.getElementById('formInput')
		if (DOMInput) {
			if (document.activeElement !== DOMInput && activeResult < 0) {
				DOMInput.focus()
				// return dispatch({ type: 'RESET_ACTIVE_RESULT' })
			}
		}
	}, [activeResult])

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
			{resultsOpen && resultsList.length > 0 &&
				<div
					ref={resultsRef}
					className="form-results">
					{resultsList.slice(0, 10).map((res, i) => (
						<div
							key={i}
							id={i === activeResult ? 'activeResult' : undefined}
							className={i === activeResult ? 'form-result active-result' : 'form-result'}
							onClick={() => selectResult(resultsList[i])}>
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
	resultsList: [],
	activeResult: -1
}

const searchFormReducer = (state: SearchFormState, action: SearchFormReducer): SearchFormState => {
	switch (action.type) {
		case "SET_VALUE":
			return {
				...state,
				searchValue: action.value,
				resultsOpen: true,
				activeResult: -1
			}
		case "SET_RESULTS":
			return {
				...state,
				resultsList: action.value,
				resultsOpen: true,
				activeResult: -1
			}
		case "TOGGLE_RESULTS":
			return {
				...state,
				resultsOpen: action.value
			}
		case "SELECT_RESULT":
			return {
				...state,
				searchValue: action.value,
				resultsList: [],
				activeResult: -1
			}
		case "ACTIVE_RESULT_INC":
			return {
				...state,
				activeResult: state.activeResult < state.resultsList.length - 1
					? state.activeResult + 1
					: state.activeResult
			}
		case "ACTIVE_RESULT_DEC":
			return {
				...state,
				activeResult: state.activeResult > 0
					? state.activeResult - 1
					: -1
			}
		case "RESET_ACTIVE_RESULT":
			return {
				...state,
				activeResult: -1
			}
		case "RESET_FORM":
			return {
				...searchFormState,
			}
		default:
			return state
	}
}
