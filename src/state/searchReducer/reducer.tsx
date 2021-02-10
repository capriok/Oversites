export const searchFormState: SearchFormState = {
	searchValue: "",
	resultsOpen: false,
	resultsList: [],
	activeResult: -1
}

export const searchFormReducer = (state: SearchFormState, action: SearchFormReducer): SearchFormState => {
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
