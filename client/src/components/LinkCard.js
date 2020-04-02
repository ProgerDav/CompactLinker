import React from "react";

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link</h2>
      <p>
        Your link:
        <a target="_blank" rel="noopener noreferrer" href={link.to}>
          {link.to}
        </a>
      </p>
      <p>
        From:
        <a target="_blank" rel="noopener noreferrer" href={link.from}>
          {link.from}
        </a>
      </p>
      <p>
        Clicks: <strong>{link.clicks}</strong>
      </p>
      <p>
        Creation date:{" "}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};
