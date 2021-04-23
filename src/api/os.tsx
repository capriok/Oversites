import axios from 'axios'

const Log = (msg) => console.log(`%c${msg}`, 'color: crimson; font-weight: bold;');

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

		Log('Revoking User Auth Token')

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

		Log('Fetching Recently Founded Oversites')

		const res = await AxiosInstance.get(
			'/recent-oversites'
		)

		if (res.status !== 200) {
			await this.RevokeToken(userId);
		}

		const oversites = FormatOversiteDTOs(res.data)

		return {
			status: res.status,
			oversites: oversites
		}
	}

	public async FetchSearchResultOversites(userId: number, searchResult: string):
		Promise<{ status: number; oversites: Oversite[] }> {

		Log('Fetching SearchResult Oversites')

		const res = await AxiosInstance.post(
			'/searchresult-oversites',
			{ SearchResult: searchResult }
		)

		if (res.status === 401) {
			await this.RevokeToken(userId);
		}

		const oversites = FormatOversiteDTOs(res.data)

		return {
			status: res.status,
			oversites: oversites
		}
	}

	public async PostUserOversite(userId: number, formData: FormData):
		Promise<{ status: number; data: any }> {

		Log('Posting User Oversite')

		const res = await AxiosInstance.post(
			'oversite',
			formData,
			{ headers: { 'Content-Type': 'multipart/form-data' } }
		)

		if (res.status === 401) {
			await this.RevokeToken(userId);
		}

		return {
			status: res.status,
			data: res.data
		}
	}
}

function FormatOversiteDTOs(oversites: OversiteDTO[]): Oversite[] {
	let osArr: Oversite[] = []
	oversites.map((os) => {
		osArr.push({
			id: os.id,
			title: os.title,
			domain: os.domain,
			severity: os.severity,
			private: os.private,
			details: {
				description: os.description,
				category: os.category,
				sights: os.sights
			}
		})
	})
	return osArr
}

export default new osApi()