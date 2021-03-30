export const globalState: GlobalState = {
	user: {
		uid: null,
		isAuth: false,
		details: {
			username: '',
			join_date: ''
		}
	}
};

(async function () {
	const hasLSAuth = localStorage.getItem('OS_USERAUTH')

	if (hasLSAuth) {
		globalState.user.isAuth = true
		const { isAuth } = JSON.parse(hasLSAuth)
		if (isAuth) {
			await verifyToken()
		} else {
			return globalState.user.isAuth = false
		}
	}
})()

async function verifyToken() {
	const res = await fetch(
		process.env.REACT_APP_ENDPOINT + '/refreshAccessToken',
		{ credentials: 'include' }
	)
	const data = await res.json()

	switch (res.status) {
		case 200:
			const user = data

			console.log(user);

			return globalState.user = {
				...globalState.user,
				uid: user.Id,
				isAuth: true
			}
		case 401:
			localStorage.setItem('OS_USERAUTH', JSON.stringify({ isAuth: false }));
			globalState.user.isAuth = false
			return window.location.href = '/'
		default:
			console.error('Auth Error')
			break;
	}
}