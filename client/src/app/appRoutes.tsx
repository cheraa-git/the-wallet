import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

import { FC } from 'react'
import { MainPage } from './main/mainPage'
import { AuthLayout } from './auth/authLayout'
import { LoginPage } from './auth/loginPage'
import { SignupPage } from './auth/signupPage'
import { UserPage } from './user/userPage'
import { EditUserPage } from './user/editUserPage'
import { SheetPage } from './sheet/sheetPage'
import { SheetsPage } from './sheet/sheetsPage'
import { EditSheetPage } from './sheet/editSheetPage'
import { EditTransactionPage } from './transaction/editTransactionPage'
import { AboutPage } from './about/aboutPage'
import { UserLayout } from './user/userLayout'
import { SheetLayout } from './sheet/sheetLayout'
import { TransactionLayout } from './transaction/transactionLayout'

export const AppRoutes: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/', element: <MainPage/>
    },
    {
      path: 'auth', element: <AuthLayout/>, children: [
        { path: '', element: <Navigate to="/auth/login"/> },
        { path: 'signup', element: <SignupPage/> },
        { path: 'login', element: <LoginPage/> },
        { path: '*', element: <Navigate to="/auth/login"/> }
      ]
    },
    {
      path: 'user/:userId', element: <UserLayout/>, children: [
        { path: '', element: <UserPage/> },
        { path: 'edit', element: <EditUserPage/> },
        { path: '*', element: <Navigate to=".."/> }
      ]
    },
    {
      path: 'sheets', element: <SheetLayout/>, children: [
        { path: '', element: <SheetsPage/> },
        { path: ':sheetId', element: <SheetPage/> },
        { path: ':sheetId/edit', element: <EditSheetPage/> },
        { path: ':sheetId/*', element: <Navigate to=""/> }
      ]
    },
    {
      path: 'transaction/:transactionId', element: <TransactionLayout/>, children: [
        { path: '', element: <Navigate to="edit"/> },
        { path: 'edit', element: <EditTransactionPage/> },
        { path: '*', element: <Navigate to="edit"/> }
      ]
    },
    { path: 'about', element: <AboutPage/> },
    { path: '*', element: <Navigate to="/"/> }
  ]
  const elements = useRoutes(routes)
  return <>{elements}</>
}
