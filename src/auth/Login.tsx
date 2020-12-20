import React, { useContext, useState } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./AuthProvider";
import * as H from "history";

type loginProps = {
  history: H.History;
};

const Login = (props: loginProps) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, props.history);
  };

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            name="email"
            type="text"
            placeholder="Email"
            onChange={handleEmailChange}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default withRouter(Login);
