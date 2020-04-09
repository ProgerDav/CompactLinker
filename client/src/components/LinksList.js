import React from "react";
import { Link } from "react-router-dom";

export const LinksList = ({ links }) => {
  if (links.length === 0) {
    return <p className="center">You have 0 links</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>N</th>
          <th>Original</th>
          <th>Shortened</th>
          <th>View</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => (
          <tr key={link._id}>
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link to={`/details/${link._id}`}>View</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
