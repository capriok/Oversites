export const authFormState: AuthFormState = {
	title: '',
	username: 'kyle',
	password: 'admin',
	submitting: false
}

export const authFormReducer = (state: AuthFormState, action: AuthFormReducer): AuthFormState => {
	switch (action.type) {
		case "RESET_FORM":
			return {
				...authFormState
			}
		case "TITLE":
			return {
				...state,
				title: action.value
			}
		case "USERNAME":
			return {
				...state,
				username: action.value
			}
		case "PASSWORD":
			return {
				...state,
				password: action.value
			}
		case "SUBMITTING":
			return {
				...state,
				submitting: true
			}
		case "GRANT_AUTH":
			return {
				...state,
				title: 'Authenticated',
				submitting: false
			}
		case "USER_CREATED":
			return {
				...state,
				title: "Account Created",
				submitting: false
			}
		case "NAME_CONFLICT":
			return {
				...state,
				title: 'User Already Exists',
				username: '',
				password: '',
				submitting: false
			}
		case "PASS_CONFLICT":
			return {
				...state,
				title: 'Invalid Password',
				password: '',
				submitting: false
			}
		case "NOT_FOUND":
			return {
				...state,
				title: 'No Account Found',
				username: '',
				password: '',
				submitting: false
			}

		default:
			return state;
	}
}