import { useState, useCallback, useEffect } from "react";

const storageKey = "userData";

export const useAuth = () => {
  const [credentials, setCredentials] = useState(null);
  const [ready, setReady] = useState(false);

  const login = useCallback((credentials) => {
    setCredentials(credentials);

    localStorage.setItem(storageKey, JSON.stringify({ credentials }));
  }, []);

  const logout = useCallback(() => {
    setCredentials(null);

    localStorage.removeItem(storageKey);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageKey));

    if (data && data.credentials) {
      login(data.credentials);
    }

    setReady(true);
  }, [login]);

  return { login, logout, credentials, ready };
};
