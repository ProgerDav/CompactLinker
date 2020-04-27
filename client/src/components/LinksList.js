import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CopyButton } from "./CopyButton";
import { useMessage } from "../hooks/message.hook";
import { useApi } from "../hooks/api.hook";

export const LinksList = ({ links, removeLinkFromDom }) => {
  const {
    api: { deleteLink },
  } = useApi();
  const message = useMessage();

  const removeLink = async (id) => {
    try {
      const resp = await deleteLink(id);
      if (!resp) return;
      removeLinkFromDom(id);
      message(resp.message);
    } catch (e) {}
  };

  useEffect(() => {
    links.length && window.M.AutoInit();
  }, [links]);

  if (links.length === 0) {
    return <p className="center">You have 0 links</p>;
  }

  return (
    <table style={{ margin: "30px 0" }}>
      <thead>
        <tr>
          <th>N</th>
          <th>Original</th>
          <th>Shortened</th>
          <th>View</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => (
          <tr key={link._id}>
            <td>{index + 1}</td>
            <td>
              <a
                href={link.from}
                target="_blank"
                rel="noopener noreferrer"
                title={link.from}
                style={{ width: "250px", display: "inline-block" }}
                className="truncate"
              >
                {link.from}
              </a>
              <CopyButton text={link.from} />
            </td>
            <td>
              {link.to}
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
        ))}
      </tbody>
    </table>
  );
};
