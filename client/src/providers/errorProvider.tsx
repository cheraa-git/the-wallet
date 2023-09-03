import { FC, ReactNode, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { useSnackbar } from 'notistack'
import { setAuthError, setProfileError } from '../store/auth/slice'
import { setSheetError } from '../store/sheet/slice'
import { setCategoryError } from '../store/category/slice'
import { setTransactionError } from '../store/transaction/slice'

export const ErrorProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar: snackbar } = useSnackbar()
  const state = useAppSelector(state => state)

  const authError = state.auth.error
  const profileError = state.auth.profileError
  const sheetError = state.sheet.error
  const categoryError = state.category.error
  const transactionError = state.transaction.error

  useEffect(() => {
    if (authError) {
      snackbar(authError, { variant: 'error' })
      dispatch(setAuthError(null))
    }
    if (profileError) {
      snackbar(profileError, { variant: 'error' })
      dispatch(setProfileError(null))
    }
    if (sheetError) {
      snackbar(sheetError, { variant: 'error' })
      dispatch(setSheetError(null))
    }
    if (categoryError) {
      snackbar(categoryError, { variant: 'error' })
      dispatch(setCategoryError(null))
    }
    if (transactionError) {
      snackbar(transactionError, { variant: 'error' })
      dispatch(setTransactionError(null))
    }
  }, [authError, transactionError, sheetError, categoryError, profileError, dispatch, snackbar])
  return (
    <>
      {children}
    </>
  )
}
