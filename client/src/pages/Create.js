import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useHttp } from "../hooks/http.hook";
import { useHistory } from "react-router-dom";

export const Create = () => {
  const [link, setLink] = useState("");

  const history = useHistory();
  const auth = useContext(AuthContext);

  const { request } = useHttp();

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/links/generate",
          "POST",
          {
            from: link,
          },
          { Authorization: `Bearer ${auth.token}` }
        );

        history.push(`/details/${data.link._id}`);
      } catch (e) {}
    }
  };

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2 rem" }}>
        <div className="input-field">
          <input
            placeholder="your link..."
            id="link"
            type="url"
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Link</label>
        </div>
      </div>
    </div>
  );
};
