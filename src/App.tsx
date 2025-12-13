import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import CreateProjectPage from './pages/Projects/CreateProjectPage';
import LoginPage from './pages/Auth/LoginPage';

const App = () => {
  return (
    <Routes>

      {/* 🔓 مسیرهای عمومی */}
      <Route path="/login" element={<LoginPage />} />

      {/* 🔐 مسیرهای محافظت‌شده */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/projects/new" element={<CreateProjectPage />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
