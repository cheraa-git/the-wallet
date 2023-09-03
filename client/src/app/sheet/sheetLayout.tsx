import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch } from '../../store/store'
import { loadSheets } from '../../store/sheet/actions'
import { loadTransactions } from '../../store/transaction/actions'

export const SheetLayout: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadSheets())
    dispatch(loadTransactions())
  }, [dispatch])

  return (
    <div>
      <Outlet/>
    </div>
  )
}
