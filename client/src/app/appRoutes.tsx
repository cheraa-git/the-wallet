import { Navigate, useLocation } from 'react-router-dom'
import { FC } from 'react'
import { AuthLayout } from './auth/authLayout'
import { LoginPage } from './auth/loginPage'
import { SignupPage } from './auth/signupPage'
import { UserPage } from './user/userPage'
import { SheetPage } from './sheet/sheetPage'
import { SheetsPage } from './sheet/sheetsPage'
import { EditSheetPage } from './sheet/editSheetPage'
import { EditTransactionPage } from './transaction/editTransactionPage'
import { UserLayout } from './user/userLayout'
import { SheetLayout } from './sheet/sheetLayout'
import { TransactionLayout } from './transaction/transactionLayout'
import { RouteObjectWithProtected, useRoutesWithProtected } from '../hooks/useRoutesWithProtected'
import { useAuthState } from '../store/auth/slice'
import { CreateSheetPage } from './sheet/createSheetPage'
import { LinearProgress } from '@mui/material'

export const AppRoutes: FC = () => {
  const location = useLocation()
  const { isAuth, loading } = useAuthState()

  const routes: RouteObjectWithProtected[] = [
    {
      path: 'auth', element: <AuthLayout/>,
      protected: { navigate: location.state?.referrer?.pathname || '/', accessibility: !isAuth },
      children: [
        { path: '', element: <Navigate to="/auth/login"/> },
        { path: 'signup', element: <SignupPage/> },
        { path: 'login', element: <LoginPage/> },
        { path: '*', element: <Navigate to="/auth/login"/> }
      ]
    },
    {
      path: 'user/:userId', element: <UserLayout/>,
      protected: { navigate: '/auth/login', accessibility: isAuth },
      children: [
        { path: '', element: <UserPage/> },
      ]
    },
    {
      path: 'sheets',
      element: <SheetLayout/>,
      protected: { navigate: '/auth/login', accessibility: isAuth },
      children: [
        { path: '', element: <SheetsPage/> },
        {path: 'new', element: <CreateSheetPage/>},
        { path: ':sheetId', element: <SheetPage/> },
        { path: ':sheetId/edit', element: <EditSheetPage/> },
        { path: ':sheetId/*', element: <Navigate to=""/> }
      ]
    },
    {
      path: 'transaction/:transactionId',
      element: <TransactionLayout/>,
      protected: { navigate: '/auth/login', accessibility: isAuth },
      children: [
        { path: '', element: <Navigate to="edit"/> },
        { path: 'edit', element: <EditTransactionPage/> },
        { path: '*', element: <Navigate to="edit"/> }
      ]
    },
    { path: '*', element: <Navigate to="/sheets"/> }
  ]

  const elements = useRoutesWithProtected(routes)
  return (
    <>
      {loading ? <LinearProgress/> : elements}
    </>
  )
}
