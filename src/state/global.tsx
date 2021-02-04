export const globalState: GlobalState = {
	user: {
		uid: null,
		username: '',
		join_date: '',
		au: {
			isAuth: false,
			token: ''
		}
	}
}

const hasLSAuth = localStorage.getItem('OS_USERAUTH');
if (hasLSAuth) {
	globalState.user.au.isAuth = true
	const { isAuth } = JSON.parse(hasLSAuth)
	if (isAuth) {
		verifyToken()
	} else {
		globalState.user.au.isAuth = false;
	}
}


async function verifyToken() {
	const res = await fetch(
		process.env.REACT_APP_ENDPOINT + '/user-auth',
		{ credentials: 'include' }
	)
	const { status, message, data: decode } = await res.json()

	if (status === 200) {
		const { uid, username, join_date } = decode.user
		console.log({ User: decode })

		return globalState.user = {
			uid,
			username,
			join_date,
			au: {
				isAuth: true,
				token: decode.accessToken
			}
		}
	} else {
		console.log({ User: message })
		return globalState.user.au.isAuth = false
	}
}