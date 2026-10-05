import { create } from "zustand";
import type { AuthUser, HomeAccess, LoginInput, MenuOption } from "../../domain/Auth";
import { authUseCases } from "../../auth.dependencies";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  menu: MenuOption[];
  accesos: HomeAccess[];
  loading: boolean;
  sessionVersion: number;

  login: (data: LoginInput) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  menu: [],
  accesos: [],
  loading: false,
  sessionVersion: 0,

  login: async (data) => {
    if (get().loading) {
      throw new Error("Ya hay un inicio de sesión en curso.");
    }

    const version = get().sessionVersion + 1;

    set({
      user: null,
      token: null,
      menu: [],
      accesos: [],
      loading: true,
      sessionVersion: version,
    });

    try {
      const session = await authUseCases.login(data);

      if (get().sessionVersion !== version) {
        throw new Error("Este intento de inicio de sesión fue cancelado.");
      }

      set({
        user: session.user,
        token: session.token,
        menu: session.menu,
        accesos: session.accesos,
      });
    } finally {
      if (get().sessionVersion === version) {
        set({ loading: false });
      }
    }
  },

  logout: () => {
    set((state) => ({
      user: null,
      token: null,
      menu: [],
      accesos: [],
      loading: false,
      sessionVersion: state.sessionVersion + 1,
    }));

    window.location.replace("/");
  },
}));