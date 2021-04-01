import { globalState, globalState as initialState } from './global'
import { RevokeToken } from '../../api/os'

export function globalReducer(state: GlobalState, action: GlobalReducer): GlobalState {
	switch (action.type) {
		case "GRANT_AUTH":
			return {
				...state,
				user: {
					...state.user,
					id: action.user.id,
					lastLogin: action.user.lastLogin,
					isAuth: true
				}
			}
		case "REVOKE_AUTH":
			RevokeToken(globalState.user.id)
			return {
				...initialState
			}
		default:
			return state;
	}
}