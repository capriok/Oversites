export function globalReducer(state: GlobalState, action: Partial<ReducerAction>) {
	switch (action.type) {
		case "AUTH":
			return {
				...state,
				user: action.payload
			}
		default:
			return state;
	}
}