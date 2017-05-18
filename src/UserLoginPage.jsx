import React, {Component} from 'react';
import Input from './components/Input';
import ErrorMessage from './components/ErrorMessage';
import { Form, FormGroup, ControlLabel, Col, Button} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

import './App.css';

class UserLoginPage extends Component {
	constructor(props) {
		super(props);
		this.validateDate = this.validateDate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.callBackFn = this.callBackFn.bind(this);
		this.dirtyCheckCallBack =  this.dirtyCheckCallBack.bind(this);
		this.state = {
	        value:'',
			dateValue:'',
	        error:null,
			isValid:false
		};
	}

	validateDate(evt){
		let userDate = new Date(evt);

		let ageOfPerson = this.calculateAge(userDate.getMonth()+1,userDate.getDate(),userDate.getFullYear())
		if(ageOfPerson < 14 || ageOfPerson > 150){
			this.setState({
				error: 'Min age is 14 and Max age is 150',
				dateValue: evt
			})
		} else {
			this.setState({
				error: null,
				dateValue: evt
			})
		}

	}
	calculateAge(birthMonth, birthDay, birthYear)
		{
		 let todayDate = new Date();
		 let todayYear = todayDate.getFullYear();
		 let todayMonth = todayDate.getMonth();
		 let todayDay = todayDate.getDate();
		 let age = todayYear - birthYear;

		  if (todayMonth < birthMonth - 1)
		  {
		    age--;
		  }

		  if (birthMonth - 1 == todayMonth && todayDay < birthDay)
		  {
		    age--;
		  }
		  return age;
	  }

	  handleSubmit(evt) {
		  if(this.state.pwd !== this.state.confpwd)
		  {
			  alert("Your passwords don't match");
		  }else if( this.state.isValid) {
			   alert("Thank you for Signup !!!");
		  }else {
			  alert("Please fill all items");
		  }

	  }

	  callBackFn(type, value) {
		  if(type === 'pwd') {
			  this.setState({
				 'pwd':value
			 });
		 } else {
			 this.setState({
			  'confpwd':value
		  });
		 }

	  }

	  dirtyCheckCallBack(isStillValid) {
		  this.setState({
		   'isValid' :isStillValid
	   });
	  }

	render() {
		{let btnstatus = this.state.isValid? '':'disabled'}
		return (
			 <Form horizontal>
				<Input
					labelName="Email"
					placeholder="enter email here"
					type="email"
					dirtycheck={this.dirtyCheckCallBack}
				 />
				 <Input
					 labelName="First Name"
					 placeholder="enter first name"
					 id="fName"
					 type="text"
					 dirtycheck={this.dirtyCheckCallBack}
				  />
				  <Input
					  labelName="Last Name"
					  placeholder="enter last name"
					  id="lName"
					  type="text"
					  dirtycheck={this.dirtyCheckCallBack}
				   />
			   	 <Input
	              	labelName="Password"
					placeholder="••••••••"
	              	type="password"
					id='pwd'
					inputFunc={this.callBackFn}
					dirtycheck={this.dirtyCheckCallBack}
				 />
				 <Input
					labelName="Confirm Password"
					placeholder="••••••••"
					type="password"
					id='confpwd'
					inputFunc={this.callBackFn}
					dirtycheck={this.dirtyCheckCallBack}
				 />
			 <FormGroup controlId="dataPicker" >
				 <Col componentClass={ControlLabel} sm={2}>
				   DOB
				 </Col>
				 <Col sm={10}>
				       <DatePicker id="example-datepicker" dateFormat="MM/DD/YYYY" onChange={this.validateDate} value={this.state.dateValue}/>
				 </Col>
				  <ErrorMessage msg={this.state.error}/>
			     </FormGroup>

				 <Button bsStyle="success" bsSize="large" onClick={this.handleSubmit}>Submit</Button>

			 </Form>

		);
	}
}

export default UserLoginPage;
