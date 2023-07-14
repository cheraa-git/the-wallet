import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const TransactionLayout: FC = () => {
  return (
    <div>
      TransactionLayout
      <Outlet/>
    </div>
  )
}
