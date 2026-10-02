export interface AuthState {
  jwt: string | null;
  loading: boolean;
  error: string | null;
}
