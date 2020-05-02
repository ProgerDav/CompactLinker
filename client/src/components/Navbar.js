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

  const User = ({ loading, user, mobile = false }) => {
    useEffect(() => {
      window.M.AutoInit();
    }, []);

    if (loading) return null;

    const dropdownId = `dropdown${mobile && "-mobile"}`;

    return (
      <>
        <ul id={dropdownId} className="dropdown-content">
          <li>
            <a href="#!">
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
          href={"#" + dropdownId}
          data-target={dropdownId}
        >
          {`${user.name} ${user.lastName}`}
        </a>
      </>
    );
  };

  const LinkItems = ({ mobile = false }) => (
    <>
      <li>
        <NavLink to="/create">Create</NavLink>
      </li>
      <li>
        <NavLink to="/links">Your links</NavLink>
      </li>
      <li>
        <User user={user} loading={loading} mobile={mobile} />
      </li>
    </>
  );

  return (
    <>
      <nav>
        <div
          className="nav-wrapper blue darken-1"
          style={{ padding: "0 2rem" }}
        >
          <a href="/" className="brand-logo">
            CompactLinker
          </a>

          {isAuthenticated && (
            <>
              <a
                href="#!"
                data-target="mobile-demo"
                className="sidenav-trigger white-text"
              >
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                <LinkItems />
              </ul>
            </>
          )}
        </div>
      </nav>
      {isAuthenticated && (
        <ul className="sidenav" id="mobile-demo">
          <LinkItems mobile={true} />
        </ul>
      )}
    </>
  );
};
