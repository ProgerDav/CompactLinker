import React from "react";

export const Footer = () => (
  <footer className="page-footer blue darken-1">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5 className="white-text">CompactLinker</h5>
          <p className="grey-text text-lighten-4">
            You can use rows and columns here to organize your footer content.
          </p>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
        &copy; copyright {new Date().getFullYear()}
        <a className="grey-text text-lighten-4 right" href="#!">
          More Links
        </a>
      </div>
    </div>
  </footer>
);
