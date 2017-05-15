import React from 'react';
import UserLoginForm from './UserLoginForm';
import './App.css';

class UserLoginPage extends React.Component {
	render(){
		return (
			<div className="container application_wrapper">
        <div className="container application_routeHandler">
				    <UserLoginForm />
        </div>
			</div>
			);
	}
}

export default UserLoginPage;
