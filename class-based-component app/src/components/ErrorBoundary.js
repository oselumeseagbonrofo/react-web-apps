import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  componentDidCatch(error) { // Method that makes class components error boundaries
    console.log(error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <p>User does not exist! Try again</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
