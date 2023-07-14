import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const UserLayout: FC = () => {
  return (
    <div>
      UserLayout
      <Outlet/>
    </div>
  )
}
