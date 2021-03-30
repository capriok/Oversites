import { globalState as initialState } from './global'

export function globalReducer(state: GlobalState, action: GlobalReducer): GlobalState {
	switch (action.type) {
		case "AUTHENTICATE":
			return {
				...state,
				user: {
					...state.user,
					userId: action.userId,
					isAuth: true
				}
			}
		case "REVOKE_AUTH":
			localStorage.setItem('_osUserAuthStatus', JSON.stringify({ isAuth: false }));
			window.location.href = "/";

			return {
				...initialState
			}
		default:
			return state;
	}
}