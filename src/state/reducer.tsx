import { globalState as initialState } from './global'

export function globalReducer(state: GlobalState, action: GlobalReducer): GlobalState {
	switch (action.type) {
		case "USER_AUTH":
			return {
				...state,
				user: action.payload
			}
		case "USER_LOGOUT":
			localStorage.setItem('OS_USERAUTH', JSON.stringify({ isAuth: false }));
			window.location.href = "/";

			return {
				...initialState
			}
		default:
			return state;
	}
}