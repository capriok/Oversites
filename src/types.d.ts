interface GlobalState {
	user: User
}

type GlobalReducer =
	| { type: 'USER_AUTH', payload: User }


type SearchFormState = {
	searchValue: string
	resultsOpen: boolean
	resultsList: string[]
	activeResult: number
}

type SearchFormReducer =
	| { type: 'SET_VALUE', value: string }
	| { type: 'SET_RESULTS', value: string[] }
	| { type: 'TOGGLE_RESULTS', value: boolean }
	| { type: 'SELECT_RESULT', value: string }
	| { type: 'ACTIVE_RESULT_INC' }
	| { type: 'ACTIVE_RESULT_DEC' }
	| { type: 'RESET_ACTIVE_RESULT' }
	| { type: 'RESET_FORM' }

interface ContextProps {
	state: GlobalState
	dispatch: Dispatch<ReducerAction>
}

interface User {
	uid: number | null
	username: string
	join_date: string
	au: UserAu
}

interface UserAu {
	isAuth: boolean
	token: string
}

interface BufferObject {
	data: Array
	type: string
}

interface Oversite {
	uid: number
	site: string
	title: string
	description: string
	category: string[]
	proof: object[]
}
