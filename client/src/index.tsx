import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { SnackbarProvider } from 'notistack'
import { AppThemeProvider } from './providers/appThemeProvider'
import { ErrorProvider } from './providers/errorProvider'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppThemeProvider>
          <SnackbarProvider autoHideDuration={3000}>
            <ErrorProvider>
              <App/>
            </ErrorProvider>
          </SnackbarProvider>
        </AppThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)

reportWebVitals()
