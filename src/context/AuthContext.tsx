import { createContext, useReducer, useEffect, ReactNode } from 'react'
import { authenticate } from '../firebase/config'
import { User, UserCredential } from 'firebase/auth'


type Action =
	| {
			type: 'LOGIN'
			payload: UserCredential
	  }
	| {
			type: 'LOGOUT'
			payload: UserCredential
	  }
	| {
			type: 'AUTH_IS_READY'
			payload: User
	  }

type AppState = {
	user: UserCredential | User | null
	authIsReady: boolean
	dispatch?: React.Dispatch<Action>
}

const initialState: AppState = {
	user: null,
	authIsReady: false,
}

export const AuthContext = createContext<AppState>({} as AppState)

export const authReducer = (state: AppState, action: Action): AppState => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, user: action.payload }
		case 'LOGOUT':
			return { ...state, user: null }
		case 'AUTH_IS_READY':
			return { user: action.payload, authIsReady: true }
		default:
			return state
	}
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(authReducer, initialState)

	useEffect(() => {
		const unsub = authenticate.onAuthStateChanged((user ) => {
			dispatch({ type: 'AUTH_IS_READY', payload: user as User })
			unsub()
		})
	}, [])

	//console.log('AuthContext state:', state)

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	)
}
