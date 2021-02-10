import React, { useEffect, useRef } from 'react'
import useOutsideClick from 'utils/useOutsideClick'

interface Props {
	state: SearchFormState
	dispatch: React.Dispatch<SearchFormReducer>
	selectResult: (value: string) => void
}

const FormResults: React.FC<Props> = ({
	state,
	dispatch,
	selectResult
}) => {

	const { resultsOpen, resultsList, activeResult } = state

	const resultsRef: any = useRef()
	useOutsideClick(resultsRef, () => {
		const DOMinput = document.getElementById('formInput')

		if (document.activeElement === DOMinput) return
		if (resultsOpen) dispatch({ type: 'TOGGLE_RESULTS', value: false })
	})

	useEffect(() => {
		document.addEventListener('keydown', (e: KeyboardEvent): void => {
			const DOMResult = document.getElementById('activeResult')
			const DOMInput = document.getElementById('formInput')

			switch (e.code) {
				case 'ArrowUp':
					return dispatch({ type: 'ACTIVE_RESULT_DEC' })
				case 'ArrowDown':
					DOMInput?.blur()
					return dispatch({ type: 'ACTIVE_RESULT_INC' })
				case 'Enter':
					return selectResult(DOMResult?.textContent || '')
				case 'Escape':
					return dispatch({ type: 'TOGGLE_RESULTS', value: false })
				default:
					break;
			}
		})

		return () => document.removeEventListener('keydown', () => dispatch({ type: 'RESET_ACTIVE_RESULT' }))
	}, [])

	useEffect(() => {
		const DOMInput = document.getElementById('formInput')

		if (document.activeElement !== DOMInput && activeResult < 0) {
			DOMInput?.focus()
		}
	}, [activeResult])

	return (
		<>
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
		</>
	)
}

export default FormResults