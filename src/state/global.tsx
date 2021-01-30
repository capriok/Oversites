export const globalState: GlobalState = {
	user: {
		isAuthenticated: false,
		uid: null,
		username: '',
		token: '',
		join_date: ''
	}
}

const lsToken = localStorage.getItem('OS-UserToken')

if (lsToken) {
	let url = new URL(process.env.REACT_APP_ENDPOINT + '/token-verify:')
	url.search = `token=${lsToken}`;
	(async () => {
		const res = await fetch(url.toString())
		const { data: decode } = await res.json()
		globalState.user.isAuthenticated = true
		globalState.user.uid = decode.uid
		globalState.user.username = decode.username
		globalState.user.token = decode.token
		globalState.user.join_date = decode.join_date
	})()
}