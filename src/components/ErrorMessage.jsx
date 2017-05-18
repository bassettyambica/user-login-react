import React, {Component} from 'react';
import './ErrorStyle.css';
class ErrorMessage extends Component {

  constructor(props) {
      super(props);
  }
  render() {
      return (
          <span className="errorMsg">{this.props.msg}</span>
      );
  }
}

export default ErrorMessage;
