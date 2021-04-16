import { useState, useEffect } from 'react'
import { useGlobalValue } from '../state/global-context/state'
import { RefreshToken } from '../api/os'

function useAuthStatus() {
	const [{ user: globalStateUser }, globalDispatch] = useGlobalValue();

	const [isLoading, setLoading] = useState(true)
	const [authStatus, setAuthStatus] = useState(false)

	const hasRefreshCookie = document.cookie.split(';').some(c => c.includes('_osRefreshToken'))

	useEffect(() => {
		if (globalStateUser.isAuth) {
			setAuthStatus(true)
			setLoading(false)
		}
	}, [globalStateUser])

	useEffect(() => {
		if (!hasRefreshCookie) {
			console.log("No Cookie");
			setLoading(false)
			return
		}
		console.log("Has Cookie");
		CheckRefreshToken()
	}, [])

	async function CheckRefreshToken() {
		console.log("Checking Cookie");
		const res = await RefreshToken()

		const { status, user } = res

		if (status !== 200) {
			console.log("Unauthorized");
			globalDispatch({
				type: 'GRANT_AUTH',
				user: {
					...globalStateUser,
					userId: null,
					isAuth: false
				}
			})
		}

		console.log("Authing User");
		globalDispatch({
			type: 'GRANT_AUTH',
			user: {
				...globalStateUser,
				userId: user.userId,
				isAuth: true
			}
		})
	}

	return {
		status: authStatus,
		loading: isLoading,
	}
}

export default useAuthStatus




























// import { useState, useEffect } from 'react'
// import { useGlobalValue } from '../state/global-context/state'
// import { RefreshToken } from '../api/os'

// function useAuthStatus() {

// 	const [{ user: globalStateUser }, globalDispatch] = useGlobalValue();

// 	const [isLoading, setLoading] = useState(true)
// 	const [authStatus, setAuthStatus] = useState(false)

// 	useEffect(() => {
// 		(async function () {
// 			const hasRefreshCookie = document.cookie.split(';').some(c => c.includes('_osRefreshToken'))

// 			if (!hasRefreshCookie) {
// 				setAuthStatus(false)
// 				return
// 			}

// 			const res = await RefreshToken()
// 			const { status, user } = res

// 			if (status !== 200) {
// 				return setAuthStatus(false)
// 			}

// 			setAuthStatus(true)
// 			globalDispatch({
// 				type: 'GRANT_AUTH',
// 				user: {
// 					...globalStateUser,
// 					userId: user.userId,
// 					isAuth: true
// 				}
// 			})
// 		})()
// 	}, [])

// 	useEffect(() => {
// 		authStatus ? setLoading(false) : setLoading(!isLoading)
// 	}, [authStatus])

// 	return {
// 		status: authStatus,
// 		loading: isLoading,
// 	}
// }

// export default useAuthStatus