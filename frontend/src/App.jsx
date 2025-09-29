import { Route, Routes, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function NavBar() {
  const { token, logout } = useAuth();
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="font-semibold">Scalable App</Link>
        <div className="flex gap-3 items-center">
          {token ? (
            <>
              <Link to="/dashboard" className="text-sm text-gray-700">Dashboard</Link>
              <button onClick={logout} className="px-3 py-1 rounded bg-gray-800 text-white text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-700">Login</Link>
              <Link to="/register" className="text-sm text-gray-700">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 p-4 max-w-5xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}



