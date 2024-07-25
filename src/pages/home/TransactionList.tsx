import { useFirestore } from '../../hooks/useFirestore'
import { TransactionType } from '../../types'

// styles
import styles from './Home.module.css'

export default function TransactionList({ transactions }: { transactions: TransactionType[] }) {
  const { deleteDocument } = useFirestore('transactions')

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>R{transaction.amount}</p>
          <button onClick={() => deleteDocument(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  )
}