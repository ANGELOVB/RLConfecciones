import type { AuthSession, LoginInput } from "../domain/Auth";
import type { AuthRepository } from "../domain/AuthRepository";

export function crearAuthUseCases(repository: AuthRepository) {
  return {
    login(data: LoginInput): Promise<AuthSession> {
      return repository.login(data);
    },
  };
}