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
			setLoading(false)
			return
		}

		(async () => {
			const res = await RefreshToken()
			const { status, user } = res

			if (status !== 200) {
				globalDispatch({ type: 'REVOKE_AUTH' })
			}

			globalDispatch({
				type: 'GRANT_AUTH',
				user: {
					...globalStateUser,
					userId: user.userId,
					isAuth: true
				}
			})
		})()

	}, [])

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