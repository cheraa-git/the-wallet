import { FC } from 'react'
import { useTransactionState } from '../../store/transaction/slice'
import { TransactionCard } from './transactionCard'
import { Container } from '@mui/material'

export const Transactions: FC = () => {
  const {transactions} = useTransactionState()
  return (
    <Container maxWidth="md">
      {transactions.map(transaction => <TransactionCard key={transaction._id} transaction={transaction}/>)}
    </Container>
  )
}
