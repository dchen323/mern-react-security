import React, { Component } from "react";

const inputString = "<input type='text' defaultValue='rendered'/>";

export default class EscapeInput extends Component {
  constructor() {
    super();
    this.state = { title: "" };
    this.updateTitle = this.updateTitle.bind(this);
  }

  updateTitle(e) {
    this.setState({ title: e.target.value });
  }

  render() {
    return (
      <div>
        <h3>Safe React Input</h3>
        <content>{inputString}</content>
        <h4>{this.state.title}</h4>
        <br />
        <input placeholder="Set title.." onChange={this.updateTitle} />
        <br />
      </div>
    );
  }
}
