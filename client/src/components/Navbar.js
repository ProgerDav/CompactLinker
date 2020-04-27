import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../context/auth.context";
import { NavLink, useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";

export const Navbar = () => {
  const history = useHistory();

  const [user, setUser] = useState({});

  const { request, loading } = useHttp();

  const { logout, isAuthenticated, credentials } = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    logout();
    history.push("/");
  };
  const getUserData = useCallback(async () => {
    const user = await request("/api/auth/user", "GET", null, {
      Authorization: `Basic ${credentials}`,
    });

    setUser(user);
  }, [request, credentials]);

  useEffect(() => {
    if (isAuthenticated) getUserData();
  }, [getUserData, isAuthenticated]);

  const User = ({ loading, user }) => {
    useEffect(() => {
      window.M.AutoInit();
    }, []);

    if (loading) return <></>;

    return (
      <>
        <ul id="dropdown" className="dropdown-content">
          <li>
            <a href="#">
              <i className="material-icons">person</i>
              {`${user.name}`}
            </a>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Log out <i className="material-icons">exit_to_app</i>
            </a>
          </li>
        </ul>
        <a
          className="dropdown-trigger btn"
          href="#dropdown"
          data-target="dropdown"
        >
          {`${user.name} ${user.lastName}`}
        </a>
      </>
    );
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
              <User user={user} loading={loading} />
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};
