interface GlobalState {
	user: User
}

type GlobalReducer =
	| { type: 'GRANT_AUTH', user: UserModel }
	| { type: 'REVOKE_AUTH' }

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

type AuthFormDispatch = Dispatch<AuthFormReducer>

type AuthFormReducer =
	| { type: 'FIELDS', values: { username: string, password: string } }
	| { type: 'SUBMITTING' }
	| { type: 'GRANT_AUTH' }
	| { type: 'NOT_FOUND' }
	| { type: 'PASS_CONFLICT' }
	| { type: 'USER_CREATED' }
	| { type: 'NAME_CONFLICT' }
	| { type: 'SET_FORM' }



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
	| { type: 'SET_FORM' }


interface User {
	id: number | null
	isAuth: boolean
	lastLogin: string
	details: UserDetails
}

interface UserModel {
	id: number | null
	lastLogin: string
	username: string
	joinDate: string
	domains: string[]
}

interface UserDetails {
	username: string
	joinDate: string
	domains: string[]
}

interface BufferObject {
	data: Array
	type: string
}

interface Oversite {
	id: number
	title: string
	domain: string
	severity: string
	description: string
	category: string[]
	private: boolean
	sights: Sight[]
}

interface Sight {
	data: any
	oversiteId: number
}