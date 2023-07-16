import React, { useEffect } from 'react'
import { AppRoutes } from './app/appRoutes'
import { NavBar } from './app/navbar/navBar'
import { useAppDispatch } from './store/store'
import { autologin } from './store/auth/actions'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
     dispatch(autologin())
  }, [dispatch])
  return (
    <div>
      <NavBar/>
      <AppRoutes/>
    </div>
  )
}

export default App
