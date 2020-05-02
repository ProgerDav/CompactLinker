import React, { useState, useEffect, useContext } from "react";
import { useApi } from "../hooks/api.hook";
import { useMessage } from "../hooks/message.hook";
import { LinksContext } from "../context/links.context";

export const Modal = ({ initialLink }) => {
  const { pushLink } = useContext(LinksContext);

  const [link, setLink] = useState("");
  const message = useMessage();
  const {
    loading,
    api: { createLink },
  } = useApi();

  useEffect(() => {
    setLink(initialLink);
  }, [initialLink]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      if (
        !link.match(
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
        )
      ) {
        return message("Please enter a valid url");
      }
      const linkData = await createLink(link);
      setLink("");

      if (linkData.duplicate) return message("Link already exists");

      pushLink(linkData);
      message("Link was shortened successfully");
    } catch (e) {}
  };

  return (
    <div id="linkModal" className="modal bottom-sheet">
      <div className="modal-content">
        <h5>Paste a new link</h5>
        <hr />
        <form className="row">
          <div className="input-field col l5 offset-l3 m7 offset-m2 s12">
            <input
              id="link"
              name="link"
              type="url"
              className="validate"
              placeholder="https://example.am"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <label htmlFor="link">Url</label>
          </div>
          <div className="input-field col l1 m1 s3">
            <button
              disabled={loading}
              className="btn waves-effect waves-light blue darken-1"
              type="submit"
              onClick={handleSubmit}
            >
              Minify
            </button>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button className="modal-close waves-effect waves-green btn-flat">
          Cancel
        </button>
      </div>
    </div>
  );
};
