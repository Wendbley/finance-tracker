import { useReducer, useEffect, useState } from 'react'
import { database } from '../firebase/config'
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'

type Action =
	| { type: 'IS_PENDING' }
	| { type: 'ADDED_DOCUMENT'; payload: any }
	| { type: 'DELETED_DOCUMENT' }
	| { type: 'ERROR'; payload: string }
type State = {
	document: any | null
	isPending: boolean
	error: string | null
	success: boolean
}
let initialState: State = {
	document: null,
	isPending: false,
	error: null,
	success: false,
}

const firestoreReducer = (state: State, action: Action) => {
	switch (action.type) {
		case 'IS_PENDING':
			return { isPending: true, document: null, success: false, error: null }
		case 'ADDED_DOCUMENT':
			return {
				isPending: false,
				document: action.payload,
				success: true,
				error: null,
			}
		case 'DELETED_DOCUMENT':
			return { isPending: false, document: null, success: true, error: null }
		case 'ERROR':
			return {
				isPending: false,
				document: null,
				success: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const useFirestore = (_collection: string) => {
	const [response, dispatch] = useReducer(firestoreReducer, initialState)
	const [isCancelled, setIsCancelled] = useState(false)

	// collection ref
	//const ref = collection(database, _collection)

	// only dispatch is not cancelled
	const dispatchIfNotCancelled = (action: Action) => {
		if (!isCancelled) {
			dispatch(action)
		}
	}

	// add a document
	const addDocument = async (doc: {
		uid: string
		name: string
		amount: string
	}) => {
		dispatch({ type: 'IS_PENDING' })

		try {
			// const createdAt = Timestamp.fromDate(new Date())
			const addedDocument = await addDoc(collection(database, _collection), {
				...doc,
				createdAt: serverTimestamp()
			})
			
			// const addedDocument = await ref.add({ ...doc, createdAt })
			dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
		} catch (err) {
			if (err instanceof Error)
				dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
		}
	}

	// delete a document
	const deleteDocument = async (id: string) => {
		dispatch({ type: 'IS_PENDING' })

		try {
			// await ref.doc(id).delete()
			await deleteDoc(doc(database, _collection, id));
			dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
		} catch (err) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
		}
	}

	useEffect(() => {
		return () => setIsCancelled(true)
	}, [])

	return { addDocument, deleteDocument, response }
}
