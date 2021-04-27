import { Log, AxiosGeneralInstance } from './os'

export class AuthApi {

	private async AuthRequest(path: string, data: { username: string; password: string }) {
		const res = await AxiosGeneralInstance.post(path, data)

		return {
			status: res.status,
			user: res.data
		}
	}


	public async Login(username: string, password: string)
		: Promise<{ status: number; user: User }> {
		return await this.AuthRequest('/login', { username, password })
	}


	public async Register(username: string, password: string)
		: Promise<{ status: number; user: User }> {
		return await this.AuthRequest('/register', { username, password })
	}


	public async RefreshToken(userId): Promise<any> {

		Log('Refreshing User Auth Token')

		let response: { status: number, user: Partial<UserDTO> } = { status: 401, user: {} }

		await AxiosGeneralInstance.get('/authentication')
			.then(res => response = {
				status: res.status,
				user: res.data
			})
			.catch(e => this.RevokeToken(userId))

		console.log({ RefreshedUser: response.user })
		return response
	}


	public async RevokeToken(userId) {

		Log('Revoking User Auth Token')

		let deletedRefreshCookie = document.cookie
			.split(';')
			.filter(c =>
				c.includes('_osRefreshToken')
			).toString() + '; Max-Age=-9999;'

		document.cookie = document.cookie += deletedRefreshCookie.toString()

		await AxiosGeneralInstance.post('/authentication', { id: userId })
			.finally(() => window.location.href = '/')
	}
}

export default new AuthApi()
