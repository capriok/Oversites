interface UserDTO {
	id: number | null
	lastLogin: string
	username: string
	joinDate: string
	domains: UserDomain[]
}

interface User {
	id: number | null
	isAuth: boolean
	lastLogin: string
	details: UserDetails
}

interface UserDetails {
	username: string
	joinDate: string
	domains: UserDomain[]
}

interface UserDomain {
	id: number
	domain: string
	userId: number
}
