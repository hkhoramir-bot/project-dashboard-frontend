// src/App.tsx (تغییرات فقط در بخش ProtectedRoute)

// ... (ایمپورت‌های قبلی)
import MainLayout from './layouts/MainLayout'; // 💡 ایمپورت MainLayout جدید

// کامپوننت برای محافظت از مسیرها (بدون تغییر)
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!AuthService.getToken()) {
        return <Navigate to="/login" replace />; 
    }
    // 💡 تمام صفحات محافظت شده را داخل MainLayout قرار می‌دهیم
    return <MainLayout>{children}</MainLayout>; 
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* مسیرهای عمومی */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* مسیرهای محافظت شده (اکنون از طریق ProtectedRoute به MainLayout منتقل می‌شوند) */}
                <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetailPage /></ProtectedRoute>} />
                
                {/* اضافه کردن مسیرهای جدید برای سایدبار */}
                <Route path="/projects" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} /> 
                <Route path="/team" element={<ProtectedRoute><h1>مدیریت تیم (در دست ساخت)</h1></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute><h1>گزارش‌ها (در دست ساخت)</h1></ProtectedRoute>} />
                <Route path="/timeline" element={<ProtectedRoute><h1>زمان‌بندی (در دست ساخت)</h1></ProtectedRoute>} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;