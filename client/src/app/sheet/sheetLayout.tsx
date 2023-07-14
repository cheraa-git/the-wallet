import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const SheetLayout: FC = () => {
  return (
    <div>
      SheetLayout
      <Outlet/>
    </div>
  )
}
