import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form , Container } from 'semantic-ui-react'

class Login extends React.Component {
	constructor(){
		super();
		this.state = {
			username:'',
			password:'',
			message:''
		}
	}

	handleChange(e){
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value});
	}

	handleSubmit(e){
		e.preventDefault();
		let dataPackage = {
			username:this.state.username,
			password:this.state.password
		};
		console.log(dataPackage);
		this.postAPI('/api/users/login',dataPackage);
	}

	postAPI(url,data){
	  fetch(url,{
	    method:'POST',
	    body: JSON.stringify(data),
	    headers: new Headers({'Content-Type': 'application/json'})
	  })
		.then(response => response.json())      
	  .catch(error => console.error('Error:', error))
	  .then((response) => {
	  	if(response.failed){
	  		this.setState({message:response.failed});
	  	} else { 
		  	console.log('Success:', response.success);
		  	console.log('Token:', response.token);
		  	localStorage.setItem('wdi4',response.token);
		  	this.props.history.push('/');
	  	}
	  });
	}

  render() {
    return (
    	<Container> 
	    	<h1>Login page</h1>
	    	{this.state.message}
			  <Form>
			    <Form.Input 
			    	label='Username'
			    	type='text'
			    	name='username' 
			    	placeholder='Enter username'
			    	onChange={(e) => this.handleChange(e)}/>
			    <Form.Input 
			    	label='Password'
			    	type='password'
			    	name='password' 
			    	placeholder='Enter password'
			    	onChange={(e) => this.handleChange(e)}/>
			    <Button type='submit' onClick={(e) => this.handleSubmit(e)}>Submit</Button>
			  </Form>
		  </Container>    	
    );
  }
}

export default withRouter(Login);