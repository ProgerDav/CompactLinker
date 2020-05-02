import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CopyButton } from "./CopyButton";
import { useMessage } from "../hooks/message.hook";
import { useApi } from "../hooks/api.hook";
import { LinksContext } from "../context/links.context";
import { SearchCollapse } from "./SearchCollapse";
import { ExternalLink } from "./ExternalLink";
import "./LinksList.css";

const DummyRow = () => (
  <tr>
    <td className="center" colSpan={5}>
      Found 0 links
    </td>
  </tr>
);

const NoLinks = () => (
  <>
    <p className="center">
      You have no links yet. <Link to="/create">Click here</Link> or on the icon
      in the bottom to create a link now
    </p>
  </>
);

export const LinksList = () => {
  const {
    api: { deleteLink },
  } = useApi();
  const message = useMessage();

  const { links, filteredLinks, removeLink: rLink } = useContext(LinksContext);

  const removeLink = async (id) => {
    try {
      const resp = await deleteLink(id);
      if (!resp) return;
      rLink(id);
      message(resp.message);
    } catch (e) {}
  };

  useEffect(() => {
    links.length && window.M.AutoInit();
  }, [links]);

  if (links.length === 0) return <NoLinks />;

  const Links = filteredLinks.length ? (
    filteredLinks.map((link) => (
      <tr key={link._id}>
        <td>
          <ExternalLink text={link.from} href={link.from} />
          <CopyButton text={link.from} />
        </td>
        <td>
          <ExternalLink text={link.to} href={link.to} />
          <CopyButton text={link.to} />
        </td>
        <td>
          <Link
            className="btn btn-small green darken-1 white-text waves-effect waves-light"
            to={`/details/${link._id}`}
          >
            <i className="material-icons">visibility</i>
          </Link>
        </td>
        <td>
          <button
            onClick={() => removeLink(link._id)}
            className="btn btn-small red lighten-1 waves-effect waves-light"
          >
            <i className="material-icons">delete</i>
          </button>
        </td>
      </tr>
    ))
  ) : (
    <DummyRow />
  );

  return (
    <div className="table-container">
      <SearchCollapse />
      <table className="highlight" style={{ margin: "30px 0" }}>
        <thead>
          <tr>
            <th>Original</th>
            <th>Shortened</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{Links}</tbody>
      </table>
    </div>
  );
};
