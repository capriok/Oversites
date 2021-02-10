export function globalReducer(state: GlobalState, action: GlobalReducer): GlobalState {
	switch (action.type) {
		case "USER_AUTH":
			return {
				...state,
				user: action.payload
			}
		default:
			return state;
	}
}