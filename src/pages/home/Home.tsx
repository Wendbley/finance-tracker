// hooks
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

// components
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

// styles
import styles from './Home.module.css'
import { User } from 'firebase/auth'

// components

export default function Home() {
	const { user } = useAuthContext() as { user: User }

	const { documents, error } = useCollection(
		'transactions',
		['uid', '==', user.uid],
		['createdAt', 'desc']
	)
  
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{error && <p>{error.message}</p>}
        {documents.length === 0 && <p>{"No transactions made yet"}</p>}
				{Array.isArray(documents)  && <TransactionList transactions={documents} />}
			</div>
			<div className={styles.sidebar}>
				<TransactionForm uid={user?.uid} />
			</div>
		</div>
	)
}
