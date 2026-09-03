import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import { NotificationProvider } from './components/NotificationProvider'
import { AuthProvider } from './context/AuthProvider'
import AppShell from './app/AppShell'

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <ErrorBoundary>
          <AuthProvider>
            <AppShell />
          </AuthProvider>
        </ErrorBoundary>
      </NotificationProvider>
    </BrowserRouter>
  )
}

export default App
