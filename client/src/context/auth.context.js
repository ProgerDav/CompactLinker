import { createContext } from "react";

function noop() {}

export const AuthContext = createContext({
  credentials: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
});
