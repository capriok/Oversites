import { useState, useEffect } from 'react'
import { useGlobalValue } from '../state/global-context/state'
import { RefreshToken } from '../api/os'

async function useAuthStatus() {

	const [{ globalStateUser }, globalDispatch] = useGlobalValue();

	const [isLoading, setLoading] = useState(true);
	const [authStatus, setAuthStatus] = useState(false);

	const { status, user } = await RefreshToken()

	useEffect(() => {
		if (globalStateUser.isAuth) {
			setAuthStatus(true)
			setLoading(false)
			return
		}

		setLoading(false)

		if (status !== 200)
			return globalDispatch({ type: "REVOKE_AUTH" })

		setAuthStatus(true)
		globalDispatch({
			type: 'GRANT_AUTH',
			user: {
				...globalStateUser,
				id: user.id,
				isAuth: true
			}
		})

	}, [])

	return {
		isAuthenticated: authStatus,
		isLoading: isLoading,
	}
}

export default useAuthStatus