import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";

import { LinkCard } from "../components/LinkCard";
import { useApi } from "../hooks/api.hook";

export const Details = (props) => {
  const [link, setLink] = useState(null);

  const linkId = useParams().id;
  const {
    loading,
    api: { getLink },
  } = useApi();

  const fetchLink = useCallback(async () => {
    try {
      const link = await getLink(linkId);
      setLink(link);
    } catch (e) {}
  }, [linkId]);

  useEffect(() => {
    fetchLink();
  }, [fetchLink]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!loading && link && (
        <LinkCard link={link.link} metaData={link.metaData} />
      )}
    </>
  );
};
