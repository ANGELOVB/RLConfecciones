import { useEffect, useId, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import type { MenuOption } from "../../features/auth/domain/Auth";

interface SidebarMenuProps {
  options: MenuOption[];
  collapsed: boolean;
  onExpand: () => void;
  onNavigate: () => void;
}

interface MenuItemProps extends Omit<SidebarMenuProps, "options"> {
  option: MenuOption;
  pathname: string;
  nested?: boolean;
}

// Detecta si una opción o alguno de sus descendientes está activo.
function containsRoute(option: MenuOption, pathname: string): boolean {
  if (option.to) {
    return (
      pathname === option.to ||
      (option.to !== "/" && pathname.startsWith(`${option.to}/`))
    );
  }

  return (
    option.children?.some((child) => containsRoute(child, pathname)) ?? false
  );
}

function MenuItem({
  option,
  pathname,
  collapsed,
  onExpand,
  onNavigate,
  nested = false,
}: MenuItemProps) {
  const submenuId = useId();
  const active = containsRoute(option, pathname);
  const [open, setOpen] = useState(active);
  const hasChildren = Boolean(option.children?.length);

  // Al navegar, abre los grupos que contienen la ruta actual.
  useEffect(() => {
    if (active) setOpen(true);
  }, [pathname, active]);

  const baseClass = `flex w-full items-center gap-3 rounded-xl px-3 py-3
    text-left text-sm font-medium transition-colors
    ${collapsed ? "md:justify-center" : ""}`;

  const content = (
    <>
      {!nested && (
        <span
          aria-hidden="true"
          className="flex h-6 w-6 shrink-0 items-center justify-center font-bold"
        >
          {option.icon ?? option.label.charAt(0)}
        </span>
      )}

      <span className={`min-w-0 flex-1 ${collapsed ? "md:hidden" : ""}`}>
        {option.label}
      </span>
    </>
  );

  if (hasChildren) {
    return (
      <li>
        <button
          type="button"
          title={option.label}
          aria-label={option.label}
          aria-expanded={open}
          aria-controls={submenuId}
          className={`${baseClass} ${
            active
              ? "bg-slate-800 text-white"
              : "text-slate-300 hover:bg-slate-800"
          }`}
          onClick={() => {
            if (collapsed) {
              onExpand();
              setOpen(true);
            } else {
              setOpen((value) => !value);
            }
          }}
        >
          {content}

          <span
            aria-hidden="true"
            className={`transition-transform ${open ? "rotate-90" : ""}
              ${collapsed ? "md:hidden" : ""}`}
          >
            ›
          </span>
        </button>

        <ul
          id={submenuId}
          hidden={!open}
          className={`ml-5 mt-1 space-y-1 border-l border-slate-700 pl-3
            ${collapsed ? "md:hidden" : ""}`}
        >
          {option.children!.map((child) => (
            <MenuItem
              key={child.id}
              option={child}
              pathname={pathname}
              collapsed={collapsed}
              onExpand={onExpand}
              onNavigate={onNavigate}
              nested
            />
          ))}
        </ul>
      </li>
    );
  }

  if (!option.to) return null;

  return (
    <li>
      <NavLink
        to={option.to}
        end={option.to === "/"}
        title={option.label}
        aria-label={option.label}
        onClick={onNavigate}
        className={({ isActive }) =>
          `${baseClass} ${
            isActive
              ? "bg-cyan-900 text-white"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`
        }
      >
        {content}
      </NavLink>
    </li>
  );
}

export function SidebarMenu({
  options,
  collapsed,
  onExpand,
  onNavigate,
}: SidebarMenuProps) {
  const { pathname } = useLocation();

  return (
    <ul className="space-y-1">
      {options.map((option) => (
        <MenuItem
          key={option.id}
          option={option}
          pathname={pathname}
          collapsed={collapsed}
          onExpand={onExpand}
          onNavigate={onNavigate}
        />
      ))}
    </ul>
  );
}
