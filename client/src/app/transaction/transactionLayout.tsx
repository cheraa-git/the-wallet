import { FC, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { getOneTransaction } from '../../store/transaction/actions'
import { useAppDispatch } from '../../store/store'
import { useTransactionState } from '../../store/transaction/slice'
import { loadCategories } from '../../store/category/actions'
import { useCategoryState } from '../../store/category/slice'

export const TransactionLayout: FC = () => {
  const dispatch = useAppDispatch()
  const { transactionId } = useParams()
  const { transactions, loading } = useTransactionState()
  const { selectCategoryById } = useCategoryState()
  const transaction = transactions.find(t => t._id === transactionId)

  useEffect(() => {
    if (transactionId && !loading && !transaction) {
      dispatch(getOneTransaction(transactionId))
    }
  }, [transactionId, loading, transaction, dispatch])

  useEffect(() => {
    if (transaction) {
      if (!selectCategoryById(transaction.categoryId)) {
        dispatch(loadCategories(transaction.sheetId))
      }
    }
  }, [transaction, dispatch, selectCategoryById])

  return (
    <div>
      <Outlet/>
    </div>
  )
}
