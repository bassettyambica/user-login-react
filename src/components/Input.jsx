import React, {Component} from 'react';
import './Input.css';
import ErrorMessage from './ErrorMessage';
import { Button, Modal, FormControl, Col, ControlLabel, Form, FormGroup } from 'react-bootstrap';

class Input extends Component {

  constructor(props) {
    super(props);
    this.handleBlur =  this.handleBlur.bind(this);
    this.validate =  this.validate.bind(this);
    this.state = {
        value:'',
        error:null,
        errorMessage: null,
        pwd:'',
        confpwd:''
    };
  }

    msgFunction(target) {
        switch(target.type) {
            case 'email' : return 'Please enter email in format abc@gmail.com';
            case 'text': if(target.id == 'fName') {
                 return "First name should be only 50 chars and no numbers";
             } else if(target.id == 'lName'){
                 return "Please enter only characters";
             } else {
                  return null;
             }
            case "password":
             return "Password must be minimun 6 characters long";
            default: return;
        }
    }
  handleBlur(evt) {
          this.setState({
              value: evt.target.value,
              error: this.validate(evt.target)? null: 'error',
              errorMessage: this.validate(evt.target)? null: this.msgFunction(evt.target)
          });
  }

  validate(target) {
      this.props.dirtycheck(true);
      switch(target.type) {
          case 'email':
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(target.value);
          case 'text':
              if(target.id == 'fName'){
                 var re=/^[a-zA-Z ]{1,50}$/;
                 return re.test(target.value);
              }
              if(target.id == 'lName'){
                 var re=/^[a-zA-Z ]{0,50}$/;
                 return re.test(target.value);
              }
         case "password" :
                var re = /^.{6,30}$/;
                {this.props.inputFunc(target.id, target.value)};
                return re.test(target.value);
          default: return;
      }
  }


  render() {
      {if(this.props.value ==='') {
          this.props.dirtycheck(false);
      }}
      return (
          <div className="inputComponent">
              <FormGroup controlId={this.props.id} validationState={this.state.error}>
                  <Col componentClass={ControlLabel} sm={2}>
                    {this.props.labelName}
                  </Col>
                  <Col sm={10}>
                    <FormControl
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        onBlur={this.handleBlur}
                        value={this.props.value}
                    />
                  </Col>
                  <ErrorMessage msg={this.state.errorMessage}/>
              </FormGroup>

          </div>

      );
  }
}

export default Input;
