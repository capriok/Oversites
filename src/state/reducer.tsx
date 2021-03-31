import { includes } from 'lodash';
import { globalState as initialState } from './global'

export function globalReducer(state: GlobalState, action: GlobalReducer): GlobalState {
	switch (action.type) {
		case "GRANT_AUTH":
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
			revokeAuthenticationCookies()
			return {
				...initialState
			}
		default:
			return state;
	}
}

async function revokeAuthenticationCookies() {
	await fetch(
		process.env.REACT_APP_ENDPOINT + '/authentication',
		{ method: 'POST', credentials: 'include' }
	)
}