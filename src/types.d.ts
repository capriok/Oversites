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
	category: string
	description: string
	screenshots: object[]
}