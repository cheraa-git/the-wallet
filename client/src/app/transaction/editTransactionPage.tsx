import { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, CircularProgress, Container, Paper, Typography } from '@mui/material'
import { TransactionForm } from './transactionForm'
import { useTransactionState } from '../../store/transaction/slice'
import { useCategoryState } from '../../store/category/slice'
import { useAppDispatch } from '../../store/store'
import { CreateTransactionBody } from '../../../../common/types/request/transactionRequestTypes'
import { removeTransaction, updateTransaction } from '../../store/transaction/actions'
import { formatDateRelative } from '../../utils/format'
import { useConfirm } from '../../hooks/useConfirm'

export const EditTransactionPage: FC = () => {
  const dispatch = useAppDispatch()
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const { showConfirm } = useConfirm()
  const { transactions, loading: transactionLoading } = useTransactionState()
  const { loading: categoryLoading } = useCategoryState()
  const transaction = transactions.find(t => t._id === transactionId)

  useEffect(() => {
    if (!transactionLoading && !categoryLoading && !transaction) {
      navigate(-1)
    }
  }, [transactionLoading, categoryLoading, transaction, navigate])

  const handleSubmit = (data: CreateTransactionBody) => {
    if (transaction) {
      dispatch(updateTransaction({ ...transaction, ...data }))
        .then(() => navigate(`/sheets/${transaction.sheetId}`))
    }
  }

  const handleRemoveTransaction = () => {
    if (transaction) {
      const sheetId = transaction.sheetId
      showConfirm('Восстановить операцию будет невозможно', () => {
        dispatch(removeTransaction(transaction._id))
          .then(() => navigate(`/sheets/${sheetId}`))
      })
    }
  }

  if (transactionLoading || categoryLoading) {
    return <Box display="flex" justifyContent="center" mt={3}><CircularProgress/></Box>
  }

  if (!transaction) {
    return <></>
  }
  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Box display="flex" justifyContent="space-between" className="border-b">
          <Typography variant="h5">Изменение операции</Typography>
          <Box>
            <Typography fontSize={16} color="text.secondary">
              Создано: {formatDateRelative(transaction.createdAt)}
            </Typography>
            {
              transaction.createdAt !== transaction.updatedAt &&
              <Typography fontSize={16} color="text.secondary">
                Изменено: {formatDateRelative(transaction.updatedAt)}
              </Typography>
            }
          </Box>
        </Box>
        <Box display="flex" justifyContent="end">
          <Button color="error" onClick={handleRemoveTransaction}>Удалить операцию</Button>
        </Box>
        <TransactionForm
          onSubmit={handleSubmit}
          type={transaction?.type || 'expense'}
          defaultValues={transaction}
          sheetId={transaction.sheetId}
          onCancel={()=> navigate(`/sheets/${transaction.sheetId}`)}
        />
      </Paper>
    </Container>
  )
}
