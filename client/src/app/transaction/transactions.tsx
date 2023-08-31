import { FC, useState } from 'react'
import { useTransactionState } from '../../store/transaction/slice'
import { TransactionCard } from './transactionCard'
import { Button, ButtonGroup, Container } from '@mui/material'
import { TransactionType } from '../../../../common/types/types'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { AddTransactionDialog } from './addTransactionDialog'

export const Transactions: FC<{ sheetId: string }> = ({ sheetId }) => {
  const { transactions } = useTransactionState()
  const [addTransactionDialogOpen, setAddTransactionDialogOpen] = useState<TransactionType | null>(null)


  return (
    <Container maxWidth="md">
      <ButtonGroup sx={{ mb: 2 }}>
        <Button color="success" onClick={() => setAddTransactionDialogOpen('income')}><AddIcon/> Доход</Button>
        <Button color="error" onClick={() => setAddTransactionDialogOpen('expense')}><RemoveIcon/> Расход</Button>
      </ButtonGroup>


      <AddTransactionDialog
        type={addTransactionDialogOpen}
        onClose={() => setAddTransactionDialogOpen(null)}
        sheetId={sheetId}
      />
      {transactions.map(transaction => <TransactionCard key={transaction._id} transaction={transaction}/>)}
    </Container>
  )
}
