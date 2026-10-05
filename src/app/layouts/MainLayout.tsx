import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/presentation/stores/auth.store";
import menuOptions from "../config/menu.json";
import { SidebarMenu } from "../../shared/components/SidebarMenu";
import { FiLogOut } from "react-icons/fi";

export function MainLayout() {
  const user = useAuthStore((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-dvh bg-slate-100 md:flex">
      <aside
        className={`flex flex-col bg-slate-900 text-white
          transition-[width] duration-200 motion-reduce:transition-none
          md:sticky md:top-0 md:h-dvh md:shrink-0 ${
            collapsed ? "md:w-20" : "md:w-64"
          }`}
      >
        <header
          className={`flex items-center justify-between gap-2
            border-b border-slate-800 p-4 ${
              collapsed ? "md:justify-center" : ""
            }`}
        >
          <div className={collapsed ? "md:hidden" : ""}>
            <p className="text-lg font-bold">RL confecciones</p>
            <p className="text-xs text-slate-400">Administración</p>
          </div>

          {/* Control para escritorio */}
          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
            aria-expanded={!collapsed}
            aria-controls="menu-principal"
            title={collapsed ? "Expandir menú" : "Contraer menú"}
            className="hidden h-10 w-10 shrink-0 items-center justify-center
              rounded-lg text-xl text-slate-300 hover:bg-slate-800
              focus-visible:outline-2 focus-visible:outline-cyan-400 md:flex"
          >
            <span aria-hidden="true">{collapsed ? "»" : "«"}</span>
          </button>

          {/* Control para celular */}
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="menu-principal"
            className="flex h-10 w-10 items-center justify-center
              rounded-lg text-xl hover:bg-slate-800 md:hidden"
          >
            <span aria-hidden="true">{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </header>

        <nav
          id="menu-principal"
          aria-label="Menú principal"
          className={`${mobileOpen ? "block" : "hidden"}
    p-3 md:block md:min-h-0 md:flex-1 md:overflow-y-auto`}
        >
          <SidebarMenu
            options={menuOptions}
            collapsed={collapsed}
            onExpand={() => setCollapsed(false)}
            onNavigate={() => setMobileOpen(false)}
          />
          <div className="mt-auto border-t border-slate-200 p-3">
            <button
              type="button"
              onClick={logout}
              aria-label="Cerrar sesión"
              title={collapsed ? "Cerrar sesión" : undefined}
              className={`flex w-full items-center gap-3 rounded-xl
            px-3 py-3 text-sm font-medium text-rose-600
            transition-colors hover:bg-rose-50
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-rose-500
            ${collapsed ? "justify-center" : ""}`}
            >
              <FiLogOut aria-hidden="true" className="size-5 shrink-0" />

              {!collapsed && <span>Cerrar sesión</span>}
            </button>
          </div>
        </nav>

        <footer
          className={`mt-auto hidden items-center gap-3
            border-t border-slate-800 p-4 md:flex ${
              collapsed ? "justify-center" : ""
            }`}
          title={user?.name}
        >
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full bg-cyan-500/20 font-bold text-cyan-300"
          >
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </span>

          <div className={collapsed ? "sr-only" : "min-w-0"}>
            <p className="truncate text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.rol}</p>
          </div>
        </footer>
      </aside>

      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
