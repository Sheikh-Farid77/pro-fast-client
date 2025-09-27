import { AuthContext } from "../context";

export default function AuthProvider({ children }) {
  const state = {};
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
