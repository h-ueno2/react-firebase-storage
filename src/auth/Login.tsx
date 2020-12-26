import React, { useContext, useState } from "react";
import { withRouter } from "react-router";
import { Box, Button, TextField } from "@material-ui/core";
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
    <Box>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <Box m={2} p={1}>
          <TextField
            name="email"
            type="text"
            placeholder="Email"
            onChange={handleEmailChange}
          />
        </Box>
        <Box m={2} p={1}>
          <TextField
            name="password"
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
        </Box>
        <Box m={2} p={1}>
          <Button variant="outlined" type="submit">
            Log in
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default withRouter(Login);
