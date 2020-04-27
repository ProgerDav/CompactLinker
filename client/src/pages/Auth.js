import React, { useState, useEffect, useContext, useRef } from "react";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/auth.context";
import { useApi } from "../hooks/api.hook";
import { Advantages } from "../components/Advantages";

import "materialize-stepper";

export const Auth = () => {
  const auth = useContext(AuthContext);

  const initalState = {
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
    message = useMessage(),
    parallax = useRef(null);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState(initalState);

  const {
    loading,
    error,
    clearError,
    api: { logIn, register },
  } = useApi();

  const changeHandler = (form) => (e) => {
    if (form === "register")
      setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    else setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
    new window.MStepper(document.querySelector(".stepper"));
  }, []);

  useEffect(() => {
    window.M.Parallax.init(parallax.current);
  }, [parallax]);

  const registerHandler = async () => {
    try {
      const data = await register(registerForm);
      message(data.message);
      setRegisterForm(initalState);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await logIn(loginForm);
      auth.login(data.credentials);
    } catch (e) {}
  };

  return (
    <>
      <div className="parallax-container">
        <div className="section no-pad-bot">
          <div className="container">
            <h1 className="header center teal-text text-lighten-3">
              CompactLinker
            </h1>
            <div className="row center">
              <h5 className="header col s12 light">
                Shorten your links - save your time
              </h5>
              <div className="col m12 l6">
                <div className="card blue teal lighten-1">
                  <div className="card-content">
                    <div className="card-title">
                      <h3>Log In</h3>
                    </div>
                    {loading && (
                      <div className="progress">
                        <div className="indeterminate"></div>
                      </div>
                    )}
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          placeholder="example@domain.com..."
                          id="email"
                          type="email"
                          name="email"
                          className="yellow-input"
                          onChange={(e) => changeHandler("login")(e)}
                          value={loginForm.email}
                        />
                        <label htmlFor="email">Email</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          placeholder="password..."
                          id="password"
                          type="password"
                          name="password"
                          className="yellow-input"
                          onChange={(e) => changeHandler("login")(e)}
                          value={loginForm.password}
                        />
                        <label htmlFor="password">Password</label>
                      </div>
                    </div>
                  </div>
                  <div className="card-action">
                    <button
                      onClick={loginHandler}
                      disabled={loading}
                      className="btn yellow darken-4 waves-effect waves-light"
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </div>
              <div className="col m12 l6">
                <div className="card blue darken-1 text-left">
                  <div className="card-content">
                    <ul className="stepper linear horizontal">
                      <li className="step active">
                        <div className="step-title waves-effect">
                          Credentials
                        </div>
                        <div className="step-content">
                          <div className="row">
                            <div className="input-field col s12">
                              <input
                                placeholder="example@domain.com..."
                                id="r_email"
                                type="email"
                                name="email"
                                className="yellow-input"
                                onChange={(e) => changeHandler("register")(e)}
                                value={registerForm.email}
                              />
                              <label htmlFor="r_email">Email</label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s12">
                              <input
                                placeholder="password..."
                                id="r_password"
                                type="password"
                                name="password"
                                className="yellow-input"
                                onChange={(e) => changeHandler("register")(e)}
                                value={registerForm.password}
                              />
                              <label htmlFor="r_password">Password</label>
                            </div>
                          </div>
                          <div className="step-actions">
                            <button className="waves-effect waves-dark btn next-step">
                              <i className="material-icons">arrow_forward</i>
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="step">
                        <div className="step-title waves-effect">
                          General info
                        </div>
                        <div className="step-content">
                          <div className="row">
                            <div className="input-field col s12">
                              <input
                                placeholder="John..."
                                id="name"
                                type="text"
                                name="name"
                                className="yellow-input"
                                onChange={(e) => changeHandler("register")(e)}
                                value={registerForm.name}
                              />
                              <label htmlFor="name">Name</label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s12">
                              <input
                                placeholder="Doe..."
                                id="lastName"
                                type="text"
                                name="lastName"
                                className="yellow-input"
                                onChange={(e) => changeHandler("register")(e)}
                                value={registerForm.lastName}
                              />
                              <label htmlFor="lastName">Last name</label>
                            </div>
                          </div>
                          <div className="step-actions">
                            <button
                              onClick={registerHandler}
                              disabled={loading}
                              className="btn yellow darken-4 waves-effect waves-dark"
                            >
                              Register
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
        <div className="parallax" ref={parallax}>
          <img src={require("../bg.jpg")} alt="Background" />
        </div>
      </div>
      <Advantages />
    </>
  );
};
