import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { NavLink, useHistory } from "react-router-dom";

export const Navbar = () => {
  const history = useHistory();
  const { logout, isAuthenticated } = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    logout();
    history.push("/");
  };

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: "0 2rem" }}>
        <a href="/" className="brand-logo">
          CompactLinker
        </a>
        {isAuthenticated && (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <NavLink to="/create">Create</NavLink>
            </li>
            <li>
              <NavLink to="/links">Your links</NavLink>
            </li>
            <li>
              <a href="/" onClick={logoutHandler}>
                Log out
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};