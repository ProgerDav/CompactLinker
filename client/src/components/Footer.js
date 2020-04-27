import React from "react";

export const Footer = () => (
  <footer className="page-footer blue darken-1">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5 className="white-text">CompactLinker</h5>
          <p className="grey-text text-lighten-4">
            You can use this website to shorten, manage and share your most
            important links.
          </p>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
        <p>
          &copy; CompactLinker {new Date().getFullYear()}. All rights reserved
        </p>
        Developed by Davit Gyulnazaryan
        <a
          className="grey-text text-lighten-4 right"
          href="mailto:developer.gyulnazaryan@gmail.com"
        >
          Email us
        </a>
      </div>
    </div>
  </footer>
);
