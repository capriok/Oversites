interface GlobalState {
	user: User
}

interface ReducerAction {
	type: string
	payload: any
}

interface ContextProps {
	state: GlobalState
	dispatch: Dispatch<ReducerAction>
}

interface User {
	isAuthenticated: boolean
	uid: number | null
	username: string
	token: string
	join_date: string
}

interface BufferObject {
	data: Array
	type: string
}

interface Oversite {
	uid: number
	site: string
	title: string
	category: string
	description: string
	screenshots: object[]
}