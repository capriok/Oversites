import React, { createContext, Reducer, useContext, useReducer } from 'react'
import { globalState } from './global'

export const StateContext = createContext<any>({
	state: globalState,
	dispatch: () => null
})

interface ProviderProps {
	globalState: GlobalState
	globalReducer: Reducer<GlobalState, GlobalReducer>
}

export const GlobalProvider: React.FC<ProviderProps> = ({ globalState, globalReducer, children }) => (
	<StateContext.Provider value={useReducer(globalReducer, globalState)}>
		{children}
	</StateContext.Provider>
)

export const useGlobalValue = () => useContext(StateContext)