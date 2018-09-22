import React, { Component } from "react";
import { Button, FormGroup, ControlLabel, FormControl } from "react-bootstrap";

export default class AuthForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }
  render() {
    return (
      <div>
        <h2>FooDz</h2>
        <FormGroup>
          <FormControl
            type="text"
            value={this.state.username}
            placeholder="username"
          />
          <br />
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="password"
          />
          <Button>Log In</Button>
          <span>or</span>
          <Button>Sign Up</Button>
        </FormGroup>
      </div>
    );
  }
}
