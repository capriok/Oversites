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

// globalState.user.au.isAuth = true;
(async () => {

	const res = await fetch(
		process.env.REACT_APP_ENDPOINT + '/u-token',
		{ credentials: 'include' }
	)
	const { status, message, data: decode } = await res.json()

	if (status === 200) {
		const { uid, username, join_date } = decode.user
		console.log({ User: decode })

		return globalState.user = {
			uid: uid,
			username: username,
			join_date: join_date,
			au: {
				isAuth: true,
				token: decode.accessToken
			}
		}
	} else {
		console.log({ User: message })
		return globalState.user.au.isAuth = false
	}
})()