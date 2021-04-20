import axios from 'axios'
import { split } from 'lodash'

const AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_ENDPOINT,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 5000
})

class osApi {

	private async AuthRequest(path: string, data: { username: string; password: string }) {
		const res = await AxiosInstance.post(path, data)

		return {
			status: res.status,
			user: res.data
		}
	}

	public async Login(username: string, password: string)
		: Promise<{ status: number; user: UserModel }> {
		return await this.AuthRequest('/login', { username, password })
	}

	public async Register(username: string, password: string)
		: Promise<{ status: number; user: UserModel }> {
		return await this.AuthRequest('/register', { username, password })
	}

	public async RefreshToken(userId): Promise<any> {
		let response: { status: number, user: Partial<UserModel> } = { status: 401, user: {} }

		await AxiosInstance.get('/authentication')
			.then(res => response = {
				status: res.status,
				user: res.data
			})
			.catch(e => this.RevokeToken(userId))

		console.log({ RefreshedUser: response.user })
		return response
	}

	public async RevokeToken(userId) {
		let deletedRefreshCookie = document.cookie
			.split(';')
			.filter(c =>
				c.includes('_osRefreshToken')
			).toString() + '; Max-Age=-9999;'

		document.cookie = document.cookie += deletedRefreshCookie.toString()

		await axios.post('/authentication', { id: userId })
			.finally(() => window.location.href = '/')
	}

	public async FetchRecentlyFoundedOversites(userId: number):
		Promise<{ status: number; oversites: Oversite[] }> {
		const res = await AxiosInstance.get(
			'/recent-oversites'
		)

		if (res.status !== 200) {
			await this.RevokeToken(userId);
		}


		return {
			status: res.status,
			oversites: res.data
		}
	}

	public async FetchSearchResultOversites(userId: number, searchResult: string):
		Promise<{ status: number; oversites: Oversite[] }> {
		const res = await AxiosInstance.post(
			'/searchresult-oversites',
			{ SearchResult: searchResult }
		)

		// const res = await AxiosInstance.get(
		// 	'/searchresult-oversites' + `:searchResult=${searchResult}}`
		// )

		if (res.status !== 200) {
			await this.RevokeToken(userId);
		}

		return {
			status: res.status,
			oversites: res.data
		}
	}
}


export default new osApi()