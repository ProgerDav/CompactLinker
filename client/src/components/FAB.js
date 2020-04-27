import React, { useEffect, useState, useCallback } from "react";
import { Modal } from "./Modal";

export const FAB = ({ pushLink }) => {
  const [link, setLink] = useState("");

  useEffect(() => {
    window.M.AutoInit();
    window.M.updateTextFields();
  }, []);

  const getTextFromClipBoard = useCallback(async () => {
    try {
      await navigator.permissions.query({ name: "clipboard-read" });
      const text = await navigator.clipboard.readText();
      console.log(text);
      if (
        text.match(
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
        )
      )
        setLink(text);
    } catch (e) {}
  }, [setLink]);

  return (
    <>
      <Modal pushLink={pushLink} initialLink={link} />
      <div className="fixed-action-btn direction-left click-to-toggle">
        <button className="btn-floating btn-large blue darken-1 hoverable pulse">
          <i className="large material-icons">menu</i>
        </button>
        <ul>
          <li>
            <button
              data-target="linkModal"
              className="btn-floating modal-trigger red"
              onClick={() => getTextFromClipBoard()}
            >
              <i className="material-icons">link</i>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
