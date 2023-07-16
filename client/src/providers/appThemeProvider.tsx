import React, { FC, ReactNode } from 'react'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useAppSelector } from '../store/store'

export const AppThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { theme } = useAppSelector((state) => state.app)

  const darkPalette: ThemeOptions['palette'] = {
    text: {
      primary: '#c2c2c2'
    },
    divider: '#797878'

  }

  const palette = theme === 'dark' ? darkPalette : {}


  const appTheme = createTheme({
    palette: {
      mode: theme,
      ...palette
    },
    typography: {
      fontFamily: '\'Nunito\', sans-serif;',
      fontWeightRegular: '300',
      fontSize: 17,
      h1: {
        fontWeight: 'bold'
      },
      h2: {
        fontWeight: 'bold'
      },
      h3: {
        fontWeight: 'bold'
      },
      h4: {
        fontWeight: 'bold'
      },
      h5: {
        fontWeight: 'bold'
      },
      h6: {
        fontWeight: 'bold'
      }
    }
  })
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline/>
      {children}
    </ThemeProvider>
  )
}
