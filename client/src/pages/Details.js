import React, { useState, useContext, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Loader } from "../components/Loader";

import { LinkCard } from "../components/LinkCard";

export const Details = props => {
  const [link, setLink] = useState(null);

  const linkId = useParams().id;
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const getLink = useCallback(async () => {
    try {
      const link = await request(`/api/links/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setLink(link);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && link && <LinkCard link={link} />}</>;
};
