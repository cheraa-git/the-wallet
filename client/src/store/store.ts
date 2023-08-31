import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppReducer } from './app/slice'
import { AuthReducer } from './auth/slice'
import { SheetReducer } from './sheet/slice'
import { CategoryReducer } from './category/slice'
import { TransactionReducer } from './transaction/slice'

export const store = configureStore({
  reducer: {
    app: AppReducer,
    auth: AuthReducer,
    sheet: SheetReducer,
    category: CategoryReducer,
    transaction: TransactionReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type GetState = () => RootState
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
