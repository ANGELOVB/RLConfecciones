import type { AuthSession, LoginInput } from "./Auth";

export interface AuthRepository {
  login(data: LoginInput): Promise<AuthSession>;
}