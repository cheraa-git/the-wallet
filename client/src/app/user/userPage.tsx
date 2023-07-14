import { FC } from 'react'
import { Outlet, useParams } from 'react-router-dom'

export const UserPage: FC = () => {
  const { userId } = useParams()
  return (
    <div>
      UserPage
      userId: {userId}
      <Outlet/>
    </div>
  )
}
