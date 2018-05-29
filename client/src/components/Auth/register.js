import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button,Form,Grid,Segment,Message,Header } from 'semantic-ui-react'

class Register extends React.Component {
	constructor(){
		super();
		this.state = {
			username:'',
			email: '',
			password:'',
			message:'',
			msgColor:'red'
		}
	}

	handleChange(e){
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value});
	}

	handleSubmit(e){
		e.preventDefault();
		if(this.state.username==='' || this.state.password==='' || this.state.email===''){
			this.setState({message:'Please fill in all the required details'});
		} else {
			let dataPackage = {
				username:this.state.username,
				email:this.state.email,
				password:this.state.password
			};
			console.log(dataPackage);
			this.postAPI('/api/users/register',dataPackage);
		}
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
	  		this.setState({message:response.success,msgColor:'brown'});
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
				    color={this.state.msgColor}
				    header='Notice'
				    content={this.state.message}
				  />
			  }	
			  <Form>
			  	<Segment>
			  		<Header as='h2' textAlign='center'>Register page</Header>
				    <Form.Input 
				    	type='text'
				    	name='username' 
				    	icon='user'
	            iconPosition='left' 			    	
				    	placeholder='Enter username'
				    	required
				    	onChange={(e) => this.handleChange(e)}/>
				    <Form.Input 
				    	type='text'
				    	name='email' 
				    	icon='mail'
	            iconPosition='left' 			    	
				    	placeholder='Enter email'
				    	required
				    	onChange={(e) => this.handleChange(e)}/>			    	
				    <Form.Input 
				    	type='password'
				    	name='password'
				    	icon='lock'
	            iconPosition='left' 			    	 
				    	placeholder='Enter password'
				    	required
				    	onChange={(e) => this.handleChange(e)}/>
				    <Button color='teal' type='submit' onClick={(e) => this.handleSubmit(e)}>Submit</Button>
			    </Segment>
			  </Form>
		  	</Grid.Column>
    	</Grid>  	    	
    );
  }
}

export default withRouter(Register);