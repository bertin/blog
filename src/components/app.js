import React from 'react';
import { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
         {this.props.children}
      </div>
    );
  }
}

// The {this.props.children} renders the CHILDREN ROUTES / COMPONENTS.
// The children components is those components that is specified as nested routes in the "src/routes.js file" as nested routes/children.
