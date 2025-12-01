import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import Login from './components/Auth/Login';
import Workspace from './components/Workspace/Workspace';
import Spinner from './components/UI/Spinner';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-loading">
        <Spinner size="lg" text="Carregando DESCRIPTA..." />
      </div>
    );
  }

  // If not logged in, show Login WITHOUT Layout
  if (!user) {
    return <Login />;
  }

  // If logged in, show Workspace WITH Layout
  return <Workspace />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
