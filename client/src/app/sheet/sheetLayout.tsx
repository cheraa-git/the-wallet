import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch } from '../../store/store'
import { loadSheets } from '../../store/sheet/actions'

export const SheetLayout: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadSheets())
  }, [dispatch])

  return (
    <div>
      <Outlet/>
    </div>
  )
}
