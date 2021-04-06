import { globalState as initialState } from './global'
import { RevokeToken } from '../../api/os'

export function globalReducer(state: GlobalState, action: GlobalReducer): GlobalState {
	switch (action.type) {
		case "GRANT_AUTH":
			return {
				...state,
				user: {
					...state.user,
					userId: action.user.userId,
					lastLogin: action.user.lastLogin,
					isAuth: true
				}
			}
		case "REVOKE_AUTH":
			RevokeToken(state.user.userId)
			return {
				...initialState
			}
		default:
			return state;
	}
}