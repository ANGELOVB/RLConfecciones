import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./features/auth/presentation/stores/auth.store";
import { LoginPage } from "./features/auth/presentation/pages/LoginPage";
import { MaquilerosPage } from "./features/maquileros/presentation/pages/MaquilerosPage";
import { MainLayout } from "./app/layouts/MainLayout";
import { HomePage } from "./app/pages/HomePage";
import { ClientesPage } from "./features/clientes/presentation/pages/ClientesPage";

export default function App() {
  const token = useAuthStore((state) => state.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <LoginPage />}
        />

        <Route
          path="/"
          element={token ? <MainLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<HomePage />} />
          <Route path="maquileros" element={<MaquilerosPage />} />
          <Route path="clientes" element={<ClientesPage />} />
          <Route path="contratos" element={<ClientesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
