export const globalState: GlobalState = {
	user: {
		userId: null,
		isAuth: false,
		details: {
			username: '',
			join_date: ''
		}
	}
};

(async function () {
	const hasLSAuth = localStorage.getItem('_osUserAuthStatus')

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
		process.env.REACT_APP_ENDPOINT + '/authentication',
		{ method: 'GET', credentials: 'include' }
	)
	const data = await res.json()

	switch (res.status) {
		case 200:
			const user = data
			console.log(user);
			return globalState.user = {
				...globalState.user,
				userId: user.Id,
				isAuth: true
			}
		default:
			localStorage.setItem('_osUserAuthStatus', JSON.stringify({ isAuth: false }));
			globalState.user.isAuth = false
			return window.location.href = '/'
	}
}