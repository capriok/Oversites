export function globalReducer(state: GlobalState, action: Partial<ReducerAction>) {
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