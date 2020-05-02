import React, { useState, useCallback, useEffect } from "react";
import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinksList";
import { FAB } from "../components/FAB";
import { useApi } from "../hooks/api.hook";

import { LinksContext } from "../context/links.context";

export const Links = () => {
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);

  const removeLink = (id) => {
    console.log(id);
    setLinks(links.filter((link) => link._id !== id));
    setFilteredLinks(filteredLinks.filter((link) => link._id !== id));
  };

  const pushLink = (link) => {
    setLinks([...links, link]);
    setFilteredLinks([...filteredLinks, link]);
  };

  const search = (q, searchFrom, searchTo) => {
    setFilteredLinks(
      links.filter((link) => {
        return (
          (searchFrom && link.from.includes(q)) ||
          (searchTo && link.to.includes(q))
        );
      })
    );
  };

  const {
    api: { getLinks },
    loading,
  } = useApi();

  const fetchLinks = useCallback(async () => {
    const links = await getLinks();
    setLinks(links);
    setFilteredLinks(links);
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) return <Loader />;

  return (
    <LinksContext.Provider
      value={{ links, filteredLinks, pushLink, removeLink, search }}
    >
      <div className="container">
        {!loading && <LinksList links={links} removeLinkFromDom={removeLink} />}
      </div>
      <FAB pushLink={pushLink} />
    </LinksContext.Provider>
  );
};
