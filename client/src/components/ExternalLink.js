import React from "react";

export const ExternalLink = ({ href, text, className = "truncate" }) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    className={className}
    href={href}
  >
    {text}
  </a>
);
