interface GlobalState {
	user: User
}

type GlobalReducer =
	| { type: 'USER_AUTH', payload: User }
	| { type: 'USER_LOGOUT' }


type SearchFormState = {
	searchValue: string
	resultsOpen: boolean
	resultsList: string[]
	activeResult: number
}

type AuthFormReducer =
	| { type: 'RESET_FORM' }
	| { type: 'TITLE', value: string }
	| { type: 'USERNAME', value: string }
	| { type: 'PASSWORD', value: string }
	| { type: 'SUBMITTING' }
	| { type: 'AUTHENTICATE' }
	| { type: 'USER_CREATED' }
	| { type: 'NAME_CONFLICT' }
	| { type: 'PASS_CONFLICT' }
	| { type: 'NOT_FOUND' }

type AuthFormDispatch = Dispatch<AuthFormReducer>

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

interface AuthFormState {
	title: string
	username: string
	password: string
	submitting: boolean
}

interface User {
	uid: number | null
	isAuth: boolean
	details: UserDeatils
}

interface UserDetails {
	username: string
	join_date: string
}

interface BufferObject {
	data: Array
	type: string
}

interface Oversite {
	site: string
	uid: number
	title: string
	serverity: number
	description: string
	category: string[]
	proof: object[]
}