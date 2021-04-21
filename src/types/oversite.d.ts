interface OversiteDTO {
	id: number
	title: string
	domain: string
	severity: string
	description: string
	category: string
	private: boolean
	sights: Sight[]
	userId: number
}

interface Oversite {
	id: number
	title: string
	domain: string
	severity: string
	private: boolean
	details: OversiteDetails
}

interface OversiteDetails {
	description: string
	category: string
	sights: Sight[]
}

interface Sight {
	id: number
	data: any
	oversiteId: number
}

interface BufferObject {
	data: Array
	type: string
}
