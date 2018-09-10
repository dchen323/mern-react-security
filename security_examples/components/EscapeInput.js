import React, { Component } from "react";

const inputString = "<input type='text' defaultValue='rendered'/>";

export default class EscapeInput extends Component {
  render() {
    return (
      <div>
        <h3>Safe React Input</h3>
        <content>{inputString}</content>
      </div>
    );
  }
}
