import { createContext, useContext } from "react";

export interface AdminSession {
  email: string;
  logout: () => void;
}

export const SessionContext = createContext<AdminSession | null>(null);

export function useSession() {
  const session = useContext(SessionContext);
  if (!session) throw new Error("useSession must be used inside the admin panel");
  return session;
}
