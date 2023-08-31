import { FC } from 'react'
import { Dialog, Paper } from '@mui/material'
import { TransactionForm } from './transactionForm'
import { CreateTransactionBody } from '../../../../common/types/request/transactionRequestTypes'
import { TransactionType } from '../../../../common/types/types'
import { useAppDispatch } from '../../store/store'
import { createTransaction } from '../../store/transaction/actions'

interface AddTransactionDialogProps {
  type: TransactionType | null
  onClose: () => void

}

export const AddTransactionDialog: FC<AddTransactionDialogProps> = ({ type, onClose }) => {
  const dispatch = useAppDispatch()

  const handleSubmit = (data: CreateTransactionBody) => {
    onClose()
    dispatch(createTransaction(data))
  }

  return (
    <Dialog open={!!type} onClose={onClose} maxWidth="sm" fullWidth>
      <Paper sx={{ p: 3, height: '70vh' }}>
        <TransactionForm onSubmit={handleSubmit} type={type || 'expense'}/>
      </Paper>
    </Dialog>
  )
}
