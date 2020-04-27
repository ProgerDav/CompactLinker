import React, { useState, useCallback, useEffect } from "react";
import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinksList";
import { FAB } from "../components/FAB";
import { useApi } from "../hooks/api.hook";

export const Links = () => {
  const [links, setLinks] = useState([]);

  const removeLink = (id) => setLinks(links.filter((link) => link._id !== id));

  const pushLink = (link) => setLinks([...links, link]);

  const {
    api: { getLinks },
    loading,
  } = useApi();

  const fetchLinks = useCallback(async () => {
    const links = await getLinks();
    setLinks(links);
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) return <Loader />;

  return (
    <>
      <div className="container">
        {!loading && <LinksList links={links} removeLinkFromDom={removeLink} />}
      </div>
      <FAB pushLink={pushLink} />
    </>
  );
};
