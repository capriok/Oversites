import { globalState as initialState } from './global'
import osApi from '../../api/os'

export function globalReducer(state: GlobalState, action: GlobalReducer): GlobalState {
	switch (action.type) {
		case "GRANT_AUTH":
			return {
				...state,
				user: {
					...state.user,
					id: action.user.id,
					lastLogin: action.user.lastLogin,
					isAuth: true,
					details: {
						...state.user.details,
						username: action.user.username,
						domains: action.user.domains
					}
				}
			}
		case "REVOKE_AUTH":
			osApi.RevokeToken(state.user.id)
			return {
				...initialState
			}
		default:
			return state;
	}
}