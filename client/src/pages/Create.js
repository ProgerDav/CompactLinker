import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useApi } from "../hooks/api.hook";

export const Create = () => {
  const [link, setLink] = useState("");

  const history = useHistory();

  const {
    api: { createLink },
  } = useApi();

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await createLink(link);

        history.push(`/details/${data.link._id}`);
      } catch (e) {}
    }
  };

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <h5 className="header center">Paste your link to minify!</h5>
      <div className="col s8 offset-s2" style={{ paddingTop: "2 rem" }}>
        <div className="input-field">
          <input
            placeholder="your link..."
            id="link"
            type="url"
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyUp={pressHandler}
          />
          <label htmlFor="link">Url</label>
        </div>
      </div>
    </div>
  );
};
