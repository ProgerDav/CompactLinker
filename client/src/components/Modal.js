import React, { useState, useEffect, useCallback } from "react";
import { useApi } from "../hooks/api.hook";
import { useMessage } from "../hooks/message.hook";

export const Modal = ({ pushLink }) => {
  const [link, setLink] = useState("");
  const message = useMessage();
  const {
    loading,
    api: { createLink },
  } = useApi();

  const getTextFromClipBoard = useCallback(async () => {
    try {
      await navigator.permissions.query({ name: "clipboard-read" });
      const text = await navigator.clipboard.readText();

      if (
        text.match(
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
        )
      )
        setLink(text);
    } catch (e) {}
  }, [setLink]);

  useEffect(() => {
    getTextFromClipBoard();
  }, [getTextFromClipBoard]);

  const handleSubmit = async () => {
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
      pushLink(linkData);
      message("Link was shortened successfully");
    } catch (e) {}
  };

  return (
    <div id="linkModal" className="modal bottom-sheet">
      <div className="modal-content">
        <h5>Paste a new link</h5>
        <hr />
        <div className="row">
          <div className="input-field col s6 m6 l5 offset-l3 offset-m1">
            <input
              id="link"
              name="link"
              type="url"
              className="validate"
              placeholder="https://example.am"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <label htmlFor="link">Url</label>
          </div>
          <div className="input-field col s2 m2 l1">
            <button
              disabled={loading}
              className="btn waves-effect waves-light blue darken-1"
              type="submit"
              onClick={handleSubmit}
            >
              Minify
            </button>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button className="modal-close waves-effect waves-green btn-flat">
          Cancel
        </button>
      </div>
    </div>
  );
};
