const basePath = process.env.REACT_APP_ENDPOINT

export async function Login(username, password) {
	return await AuthRequest('/login', { username, password })
}

export async function Register(username, password) {
	return await AuthRequest('/register', { username, password })
}

async function AuthRequest(requestPath, body) {
	const res = await fetch(
		basePath + requestPath,
		{
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body)
		})
	const data = await res.json()

	return {
		status: res.status,
		user: data
	}
}

export async function RefreshToken() {
	const res = await fetch(
		basePath + '/authentication',
		{
			method: 'GET',
			credentials: 'include'
		}
	)
	const data = await res.json()
	return {
		status: res.status,
		user: data
	}
}

export async function RevokeToken(userId) {
	await fetch(
		basePath + '/authentication',
		{
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userId })
		}
	)
}


export async function FetchOversites(userId, searchResult) {
	const res = await fetch(
		process.env.REACT_APP_ENDPOINT + '/oversites' || '',
		{
			method: 'GET',
			credentials: 'include',
			// body: JSON.stringify(searchResult)
		}
	)

	if (res.status !== 200) {
		await RevokeToken(userId);
	}

	const data = await res.json()

	return {
		status: res.status,
		oversites: data
	}
}