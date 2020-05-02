import React from "react";
import { CopyButton } from "./CopyButton";
import { useHistory } from "react-router-dom";
import { useApi } from "../hooks/api.hook";
import { ExternalLink } from "./ExternalLink";
import { Link } from "react-router-dom";

export const LinkCard = ({ link, metaData }) => {
  const history = useHistory();

  const {
    api: { deleteLink },
  } = useApi();

  if (!metaData) {
    metaData = {
      image: "",
      title: "",
    };
  }
  const image = metaData.image || require("./sample-1.jpg");

  const removeLink = async (id) => {
    try {
      const resp = await deleteLink(id);
      if (!resp) return;
      history.push("/links");
    } catch (e) {}
  };

  return (
    <>
      <div className="row">
        <div className="col s12 m4 offset-m4">
          <div className="card">
            <div className="card-image">
              <img src={image} alt="Link details" />
              <span
                className="card-title"
                style={{ backgroundColor: "rgba(0, 0, 0, .7)" }}
              >
                {metaData.title}
              </span>
              <button
                onClick={() => removeLink(link._id)}
                className="btn-floating btn-large halfway-fab waves-effect waves-light red"
              >
                <i className="material-icons">delete</i>
              </button>
            </div>
            <div className="card-content">
              <p>
                Your link: <CopyButton text={link.to} />
                <ExternalLink text={link.to} href={link.to} />
              </p>
              <p>
                Original link: <CopyButton text={link.from} />
                <ExternalLink text={link.from} href={link.from} />
              </p>
              <p>
                Clicks: <strong>{link.clicks}</strong>
              </p>
              <p>
                Creation date:{" "}
                <strong>{new Date(link.date).toLocaleDateString()}</strong>
              </p>
              <div className="card-action">
                <Link to="/links">Back to my links</Link>
                <ExternalLink
                  text="Visit link"
                  href={link.from}
                  className="teal-text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
