import { authFormState } from './state'

export const authFormReducer = (state: AuthFormState, action: AuthFormReducer): AuthFormState => {
	switch (action.type) {
		case "FIELDS":
			return {
				...state,
				username: action.values.username,
				password: action.values.password
			}
		case "SUBMITTING":
			return {
				...state,
				submitting: true
			}
		case "GRANT_AUTH":
			return {
				...state,
				title: 'Authenticated'
			}
		case "NOT_FOUND":
			return {
				...state,
				title: 'No Account Found',
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
		case "USER_CREATED":
			return {
				...state,
				title: "Account Created",
				username: '',
				password: '',
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
		case "SET_FORM":
			return {
				...authFormState,
				title: window.location.pathname.split('/')[1]
			}
		default:
			return state;
	}
}