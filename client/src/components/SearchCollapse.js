import React, { useState, useContext, useEffect } from "react";
import { LinksContext } from "../context/links.context";

export const SearchCollapse = () => {
  const { search } = useContext(LinksContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOptions, setSearchOptions] = useState({
    from: true,
    to: true,
  });

  const handleCheckboxChange = (e) => {
    setSearchOptions({
      ...searchOptions,
      [e.target.name]: !searchOptions[e.target.name],
    });
  };

  useEffect(() => {
    search(searchQuery, searchOptions.from, searchOptions.to);
  }, [searchQuery, searchOptions]);

  return (
    <ul className="collapsible">
      <li>
        <div className="collapsible-header">
          <i className="material-icons">search</i>Search
        </div>
        <div className="collapsible-body">
          <div className="row">
            <div className="input-field col l4 m4 s12">
              <div className="row">
                <div className="input-field col l6 m12 s12">
                  <label>
                    <input
                      type="checkbox"
                      className="filled-in"
                      checked={searchOptions.from}
                      name="from"
                      onChange={handleCheckboxChange}
                    />
                    <span>Original</span>
                  </label>
                </div>
                <div className="input-field col l6 m12 s12">
                  <label>
                    <input
                      type="checkbox"
                      className="filled-in"
                      checked={searchOptions.to}
                      name="to"
                      onChange={handleCheckboxChange}
                    />
                    <span>Shortened</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="input-field mt4 col s12 m8 l8">
              <input
                id="link"
                name="link"
                type="url"
                className="validate"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <label htmlFor="link">Search url</label>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
};
