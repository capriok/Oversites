import { useState, useEffect } from 'react'
import { useGlobalValue } from '../state/global-context/state'
import osApi from '../api/os'

function useAuthStatus() {
	const [{ user: globalStateUser }, globalDispatch] = useGlobalValue()

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
			const res = await osApi.RefreshToken(globalStateUser.id)
			const { status, user } = res

			if (status !== 200) {
				setLoading(false)
				globalDispatch({ type: 'REVOKE_AUTH' })
			}

			globalDispatch({ type: 'GRANT_AUTH', user })
		})()

	}, [])

	return {
		status: authStatus,
		loading: isLoading,
	}
}

export default useAuthStatus