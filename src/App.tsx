import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./features/auth/presentation/stores/auth.store";
import { LoginPage } from "./features/auth/presentation/pages/LoginPage";
import { MaquilerosPage } from "./features/maquileros/presentation/pages/MaquilerosPage";
import { CortesPage } from "./features/cortes/presentation/pages/CortesPage";
import { MainLayout } from "./app/layouts/MainLayout";
import { HomePage } from "./app/pages/HomePage";
import { ClientesPage } from "./features/clientes/presentation/pages/ClientesPage";
import { ContratosPage } from "./features/contratos/presentation/pages/ContratosPage";

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
          <Route path="cortes" element={<CortesPage />} />
          <Route path="contratos" element={<ContratosPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
