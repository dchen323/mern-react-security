import React, { Component } from "react";
import { Button, FormGroup, ControlLabel, FormControl } from "react-bootstrap";

export default class AuthForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
    this.update = this.update.bind(this);
  }

  update(e) {
    this.setState({ [e.target.placeholder]: e.target.value });
  }

  signup() {
    const { username, password } = this.state;

    this.props.auth.signup(username, password);
  }

  login() {}

  render() {
    return (
      <div>
        <h2>FooDz</h2>
        <FormGroup>
          <FormControl
            type="text"
            value={this.state.username}
            placeholder="username"
            onChange={this.update}
          />
          <br />
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.update}
          />
          <Button onClick={this.login.bind(this)}>Log In</Button>
          <span>or</span>
          <Button onClick={this.signup.bind(this)}>Sign Up</Button>
        </FormGroup>
      </div>
    );
  }
}
