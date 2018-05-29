import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button,Form,Message,Grid,Segment,Header } from 'semantic-ui-react'

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
    	<Grid
	      textAlign='center'
	      style={{ height: '100%' }}
	      verticalAlign='middle'>
	      <Grid.Column width={5}>
		    	{this.state.message.length>0 &&
					  <Message
					    color='red'
					    header='Submission Error'
					    content={this.state.message}
					  />
				  }	    	
				  <Form>
				  	<Segment>
					  	<Header as='h2' textAlign='center'>Login page</Header>
					    <Form.Input 
					    	type='text'
					    	name='username'
					    	icon='user'
	              iconPosition='left' 
					    	placeholder='Enter username'
					    	onChange={(e) => this.handleChange(e)}/>
					    <Form.Input 
					    	type='password'
					    	name='password'
	              icon='lock'
	              iconPosition='left'				    	 
					    	placeholder='Enter password'
					    	onChange={(e) => this.handleChange(e)}/>
					    <Button color='teal' type='submit' onClick={(e) => this.handleSubmit(e)}>Submit</Button>
				    </Segment>
				  </Form>
			  </Grid.Column>
    	</Grid>  	
    );
  }
}

export default withRouter(Login);