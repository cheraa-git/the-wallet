import { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteElementProps {
  navigate: string,
  accessibility: boolean
  element: ReactNode
}

export const ProtectedRouteElement: FC<ProtectedRouteElementProps> = ({ navigate, accessibility, element }) => {
  const location = useLocation()
  if (!accessibility) return <Navigate to={navigate} state={{ referrer: location }}/>
  return <>{element}</>
}
