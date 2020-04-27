import { useCallback, useContext } from "react";
import { useHttp } from "./http.hook";
import { AuthContext } from "../context/auth.context";

export const useApi = () => {
  const { credentials } = useContext(AuthContext);
  const http = useHttp();

  const logIn = useCallback(
    async (credentials) => {
      return await http.request("/api/auth/login", "POST", {
        ...credentials,
      });
    },
    [http]
  );

  const register = useCallback(
    async (data) => {
      return await http.request("/api/auth/register", "POST", {
        ...data,
      });
    },
    [http]
  );

  const getLinks = useCallback(async () => {
    return await http.request("/api/links", "GET", null, {
      Authorization: `Basic ${credentials}`,
    });
  }, [http, credentials]);

  const getLink = useCallback(
    async (linkId) => {
      return await http.request(`/api/links/${linkId}`, "GET", null, {
        Authorization: `Basic ${credentials}`,
      });
    },
    [http, credentials]
  );

  const createLink = useCallback(
    async (from) => {
      return await http.request(
        "/api/links/generate",
        "POST",
        {
          from,
        },
        { Authorization: `Basic ${credentials}` }
      );
    },
    [http, credentials]
  );

  const deleteLink = useCallback(
    async (id) => {
      if (!window.confirm("Do you really want to delete the link?"))
        return false;

      return await http.request(`/api/links/${id}`, "DELETE", null, {
        Authorization: `Basic ${credentials}`,
      });
    },
    [http, credentials]
  );

  return {
    ...http,
    api: {
      logIn,
      register,
      getLinks,
      getLink,
      createLink,
      deleteLink,
    },
  };
};
