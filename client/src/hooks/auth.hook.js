import { useState, useCallback, useEffect } from "react";

const storageKey = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [ready, setReady] = useState(false);

  const login = useCallback((jwt, id) => {
    setToken(jwt);
    setUserId(id);

    localStorage.setItem(
      storageKey,
      JSON.stringify({ token: jwt, userId: id })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageKey);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageKey));

    if (data && data.token) {
      login(data.token, data.userId);
    }

    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};
