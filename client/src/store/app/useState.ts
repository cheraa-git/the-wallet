import { RootState, useAppSelector } from '../store'

export const useApp = () => {
  const state = useAppSelector((state: RootState) => state.app)
  const isDark = state.theme === 'dark'
  return { ...state, isDark }
}
