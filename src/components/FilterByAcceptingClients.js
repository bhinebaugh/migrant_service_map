import React, { Component } from "react";

export default class FilterByAcceptingClients extends Component {
  render() {

    return (
      <div className="filter">
        <input
          type="checkbox"
          name="accepting-clients" id="accepting-clients"
          onChange={this.props.toggleAcceptingClients}
        />
        <label htmlFor="accepting-clients">show only providers that are accepting new clients</label>
      </div>
    );
  }
}
