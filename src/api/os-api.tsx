import { AuthApi } from './auth-api';
import { Log, AxiosFormInstance, AxiosGeneralInstance } from './os'

class OsApi extends AuthApi {

	public async FetchRecentlyFoundedOversites(userId: number):
		Promise<{ status: number; oversites: Oversite[] }> {

		Log('Fetching Recently Founded Oversites')

		const res = await AxiosGeneralInstance.get(
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

		const res = await AxiosGeneralInstance.post(
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

		const res = await AxiosFormInstance.post(
			'oversite',
			formData,
		)

		if (res.status === 401) {
			await this.RevokeToken(userId);
		}

		return {
			status: res.status,
			data: res.data
		}
	}


	public async GetOneOversite(userId: number, id: number):
		Promise<{ status: number; oversite: Oversite }> {

		Log(`Fetching All Oversites For Id:`, id)

		const res = await AxiosGeneralInstance.get(
			`oversite/${JSON.stringify(id)}`,
		)

		if (res.status === 401) {
			await this.RevokeToken(userId);
		}

		const oversites = FormatOneOversiteDTO(res.data)

		return {
			status: res.status,
			oversite: oversites
		}
	}
}

function FormatOneOversiteDTO(os: OversiteDTO): Oversite {
	return {
		id: os.id,
		title: os.title,
		domain: os.domain,
		severity: os.severity,
		private: os.private,
		details: {
			founder: os.founder,
			description: os.description,
			category: os.category,
			sights: os.sights
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

export default new OsApi()