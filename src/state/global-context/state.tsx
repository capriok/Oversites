import React, { createContext, Reducer, useContext, useReducer } from 'react'
import { globalState } from './global'

export const GlobalContext = createContext<any>({
	state: globalState,
	dispatch: () => null
})

interface GlobalProviderProps {
	globalState: GlobalState
	globalReducer: Reducer<GlobalState, GlobalReducer>
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ globalState, globalReducer, children }) => (
	<GlobalContext.Provider value={useReducer(globalReducer, globalState)}>
		{children}
	</GlobalContext.Provider>
)

export const useGlobalValue = () => useContext(GlobalContext)