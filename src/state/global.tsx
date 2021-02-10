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
};

(async function () {
	const hasLSAuth = localStorage.getItem('OS_USERAUTH')

	if (hasLSAuth) {
		globalState.user.au.isAuth = true
		const { isAuth } = JSON.parse(hasLSAuth)
		if (isAuth) {
			await verifyToken()
		} else {
			return globalState.user.au.isAuth = false
		}
	}
})()

async function verifyToken() {
	const res = await fetch(
		process.env.REACT_APP_ENDPOINT + '/user-auth',
		{ credentials: 'include' }
	)
	const { status, message, data: decode } = await res.json()

	switch (status) {
		case 200:
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
		case 400:
		case 401:
		case 404:
			console.log({ User: message })
			localStorage.setItem('OS_USERAUTH', JSON.stringify({ isAuth: false }));
			globalState.user.au.isAuth = false
			return window.location.href = '/'
		default:
			console.error('Auth Eror')
			break;
	}
}