import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form , Container } from 'semantic-ui-react'

class User extends React.Component {
	constructor(){
		super();
		this.state = {
			username:'',
			password:''
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
	  .then(response => {
	  if (response.status >= 400) {
	    throw new Error("Bad response from server");
	  }
	  return response.json();       
	  }).catch(error => console.error('Error:', error))
	  .then((response) => { 
	  	console.log('Success:', response.success);
	  	console.log('Token:', response.token);
	  	localStorage.setItem('wdi4', response.token)
	  	//jwt-decode npm installed but not used yet

	  // 	jwt.verify(response.token,"what-is-love",(err,authData)=>{
			//   console.log(authData);
			// })
	  });
	}

  render() {
    return (
    	<Container> 
	    	<h1>Login page</h1>
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

export default withRouter(User);