import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/Layout";

// Auth Pages
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";

// Main Pages
import { Dashboard } from "@/pages/Dashboard";
import { AdminDashboard } from "@/pages/AdminDashboard";
import { StoreOwnerDashboard } from "@/pages/StoreOwnerDashboard";
import { Profile } from "@/pages/Profile";
import { Settings } from "@/pages/Settings";
import { Unauthorized } from "@/pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Route component that handles role-based dashboard routing
const DashboardRouter = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/auth/login" replace />;
  
  switch (user.role) {
    case 'ADMIN':
      return <Navigate to="/admin" replace />;
    case 'STORE_OWNER':
      return <Navigate to="/store-owner" replace />;
    default:
      return <Dashboard />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected Routes with Layout */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardRouter />} />
              <Route path="dashboard" element={<DashboardRouter />} />
              
              {/* Normal User Dashboard */}
              <Route path="dashboard" element={
                <ProtectedRoute allowedRoles={['NORMAL_USER']}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              {/* Admin Dashboard */}
              <Route path="admin" element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              {/* Store Owner Dashboard */}
              <Route path="store-owner" element={
                <ProtectedRoute requiredRole="STORE_OWNER">
                  <StoreOwnerDashboard />
                </ProtectedRoute>
              } />
              
              {/* Common Protected Routes */}
              <Route path="profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              <Route path="settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
