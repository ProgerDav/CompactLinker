import React, { useEffect } from "react";
import { useMessage } from "../hooks/message.hook";

export const CopyButton = ({ text }) => {
  const message = useMessage();

  const copyText = async (text) => {
    await navigator.clipboard.writeText(text);
    message("Text copied to clipboard");
  };

  useEffect(() => {
    window.M.AutoInit();
  }, []);

  return (
    <button
      style={{
        marginLeft: "10px",
      }}
      className="btn btn-small btn-floating grey tooltipped waves-effect waves-light"
      data-position="bottom"
      data-tooltip="Copy to clipboard"
      onClick={() => copyText(text)}
    >
      <i className="material-icons">content_copy</i>
    </button>
  );
};
