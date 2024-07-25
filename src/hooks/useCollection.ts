import { useEffect, useState, useRef } from 'react'
import {
	collection,
	query,
	orderBy,
	where,
	onSnapshot,
} from 'firebase/firestore'
import { database } from '../firebase/config'
import { TransactionType } from '../types'

export const useCollection = (
	_collection: string,
	_query: string[],
	_orderBy: string[]
) => {
	const [documents, setDocuments] = useState<TransactionType[]>([])
	const [error, setError] = useState<Error>(new Error())

	// if we don't use a ref --> infinite loop in useEffect
	// _query is an array and is "different" on every function call
	const myQuery = useRef(_query).current
	const myOrderBy = useRef(_orderBy).current

	useEffect(() => {
		// Create a query against the collection.
		const querySnapshot = query(
			collection(database, _collection),
			where(...myQuery),
			orderBy(...myOrderBy)
		)

		// unsubscribe on transaction
		const unsubscribe = onSnapshot(
			querySnapshot,
			(snapshot) => {
				const results: TransactionType[] = []
				snapshot.forEach((doc) => {
					results.push({ ...doc.data(), id: doc.id } as TransactionType)
				})
				
				setDocuments(results )
				setError(new Error())
			},
			(error: Error) => {
				console.log(error)
				error.message = 'could not fetch the data'
				setError(error)
			}
		)

		// unsubscribe on unmount
		return () => unsubscribe()
	}, [_collection, myQuery, myOrderBy])

	return { documents, error }
}
