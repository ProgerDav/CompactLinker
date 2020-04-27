import React, { useEffect } from "react";
import { Modal } from "./Modal";

export const FAB = ({ pushLink }) => {
  useEffect(() => {
    window.M.AutoInit();
    window.M.updateTextFields();
  }, []);

  return (
    <>
      <Modal pushLink={pushLink} />
      <div className="fixed-action-btn direction-left click-to-toggle">
        <button className="btn-floating btn-large blue darken-1 hoverable pulse">
          <i className="large material-icons">menu</i>
        </button>
        <ul>
          <li>
            <button
              data-target="linkModal"
              className="btn-floating modal-trigger red"
            >
              <i className="material-icons">link</i>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
