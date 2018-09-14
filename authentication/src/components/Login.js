import React from "react";
import { Button } from "react-bootstrap";

const Login = props => (
  <div>
    <h2>FoodZ</h2>
    <Button onClick={props.auth.login}>Log In</Button>
  </div>
);

export default Login;
