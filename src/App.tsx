// src/App.tsx (تغییرات فقط در بخش ProtectedRoute)

// ... (ایمپورت‌های قبلی)
import MainLayout from './layouts/MainLayout'; // 💡 ایمپورت MainLayout جدید
import CreateProjectPage from './pages/Projects/CreateProjectPage'; // 💡 ایمپورت صفحه جدید

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <BrowserRouter>
                <Routes>
                    {/* ... (مسیرهای عمومی و محافظت شده قبلی) */}
                    
                    {/* 💡 مسیر ایجاد پروژه جدید */}
                    <Route path="/projects/new" element={<ProtectedRoute><CreateProjectPage /></ProtectedRoute>} /> 

                    {/* ... (سایر مسیرها) */}
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;