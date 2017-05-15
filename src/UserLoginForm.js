import React from 'react';
import './App.css';
//import Input from './Input';
import _ from 'lodash';
import { Button, Form, FormGroup, InputGroup, ControlLabel } from  'react-bootstrap';

class UserLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
    this.handleLastNameInput = this.handleLastNameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleConfirmPasswordInput = this.handleConfirmPasswordInput.bind(this);
  //  this.handleSubmit = this.handleSubmit.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this)
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    };
  }
  handleEmailInput(e){
    this.setState({ email:e.target.value });
  }
  handleFirstNameInput(e){
    this.setState({ firstName:e.target.value });
  }
  handleLastNameInput(e){
    this.setState({ lastName:e.target.value });
  }
  handlePasswordInput(e){
    if(!_.isEmpty(this.state.confirmPassword)){
      this.refs.passwordConfirm.isValid();
    }
  //  this.refs.passwordConfirm.hideError();
    this.setState({
      password: e.target.value
    });
  }

  handleConfirmPasswordInput(e){
    this.setState({
      confirmPassword: e.target.value
    });
  }

  isValid(){
    if(this.state.validate) {
      if(_.isEmpty(this.state.value) || !this.props.validate(this.state.value)) {
        this.setState({
          valid: false,
          errorVisible: true
        });
      }
    }

    return this.state.valid;
  }

  saveAndContinue(e){
    e.preventDefault();

       const proceedSubmit = (this.state.email !== "")
       && (this.state.firstName !== "")
       && (this.state.password === this.state.confirmPassword);


   if(proceedSubmit) {
     alert('Thank you for your registration.');
   } else {
     alert("Passwords don't match");
   }
  }
  // isConfirmedPassword(e){
  //   return (e == this.state.password)
  //   }

    validateEmail(event) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(event);
  }
  isEmpty(value) {
    return !_.isEmpty(value);
  }

	render(){
		return (
			<div className="container create_account_screen">
      <Form horizontal  className="container create_account_form" onSubmit={this.saveAndContinue}>
      <h1>Signup Form</h1>
      <FormGroup>
        <div>
  				<label>
  				    Username:
  				</label>
          <input
              text="Email Address"
              ref="email"
              type="email"
              placeholder="Email Address"
              defaultValue={this.state.email}
              validate={this.validateEmail}
              value={this.state.email}
              onChange={this.handleEmailInput}
              pattern=".{5,55}"
              title="Email should be minimum 5 and maximum 56 characters "
              required="required"
              errorMessage="Email is invalid"
              emptyMessage="Email can't be empty"
              errorVisible={this.state.showEmailError}
            />
  			</div>
        </FormGroup>
        <FormGroup>
        <div>
				    <label>
				        First Name:
				     </label>
             <input
                text="First Name"
                ref="firstname"
                type="text"
                placeholder="First Name"
              //  defaultValue={this.state.firstname}
                validate={this.isEmpty}
                value={this.state.firstName}
                onChange={this.handleFirstNameInput}
                pattern="[a-zA-Z]{1,50}"
                title="Please enter alphabets upto 50 characters only"
                required="required"
                errorMessage="First Name is invalid"
                emptyMessage="First Name can't be empty"
              //  errorVisible={this.state.showFirstNameError}
              />
			  </div>
        </FormGroup>
        <FormGroup>
        <div>
				    <label>
				        Last Name:
				     </label>
             <input
                text="Last Name"
                ref="lastname"
                type="text"
                placeholder="Last Name"
                pattern="[a-zA-Z]{1,50}"
                title="Please enter alphabets upto 50 characters only"
              //  defaultValue={this.state.lastname}
                validate={this.validateLastName}
                value={this.state.lastName}
                onChange={this.handleLastNameInput}
                errorMessage="last Name is invalid"
              //  errorVisible={this.state.showLastNameError}
              />
			  </div>
        </FormGroup>
        <FormGroup>
        <div>
          <label>
            Password:
          </label>
          <input
              text="Password"
              type="password"
              ref="password"
              placeholder="••••••••"
              validator="true"
              validator="true"
              minCharacters="6"
              requireCapitals="1"
              requireNumbers="1"
              required="required"
              pattern=".{6,}"
              title="Password must be atleast 6 characters"
              value={this.state.passsword}
              emptyMessage="Password is invalid"
              onChange={this.handlePasswordInput}
            />
        </div>
        </FormGroup>
        <FormGroup>
        <div>
          <label>
            Confirm Password:
          </label>
          <input
          text="Confirm password"
            ref="passwordConfirm"
            type="password"
            required="required"
            placeholder="••••••••"
            pattern=".{6,}"
            title="Password does not match the length"
            validate={this.isConfirmedPassword}
            value={this.state.confirmPassword}
            onChange={this.handleConfirmPasswordInput}
            emptyMessage="Please confirm your password"
            errorMessage="Passwords don't match"
          />
        </div>
        </FormGroup>
        <FormGroup>
        <div>
          <label>
            Date Of Birth:
          </label>
          <input
            type="date"
            min="2003-01-02"
            max="1967-12-31"
          />
        </div>
        </FormGroup>

        <Button
              type="submit"
              className="button button_wide"
              bsStyle="success"
              >
              CREATE ACCOUNT
        </Button>


        </Form>
			</div>

			);
	}
}

export default UserLoginForm;
