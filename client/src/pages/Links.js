import React, { useState, useContext, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth.context";
import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinksList";

export const Links = () => {
  const [links, setLinks] = useState([]);

  const { request, loading } = useHttp();

  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    const links = await request("/api/links", "GET", null, {
      Authorization: `Bearer ${token}`
    });
    setLinks(links);
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && <LinksList links={links} />}</>;
};
