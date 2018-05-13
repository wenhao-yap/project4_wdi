import React from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';

class Compute extends React.Component{

	render(){ 
		return(
			<div className="invoiceCompute">
	      <Form>
	       	<FormGroup row>
	       		<Label sm={2}>Gross Amount</Label>
	       		<Col sm={10}>
	        		<Input type="text" value={this.props.compute.gross_amount} disabled/>
	        	</Col>
	        </FormGroup>
	       	<FormGroup row>
	       		<Label sm={2}>GST(7%)</Label>
	       		<Col sm={10}>
	        		<Input type="text" value={this.props.compute.GST} disabled/>
	        	</Col>
	        </FormGroup>
	        <FormGroup row>
	       		<Label sm={2}>Discount</Label>
	       		<Col sm={10}>
	        		<Input type="text" name="discount" onChange={this.props.handleDiscount}/>
	        	</Col>
	        </FormGroup>
	       	<FormGroup row>
	       		<Label sm={2}>Net Amount</Label>
	       		<Col sm={10}>
	        		<Input type="text" value={this.props.compute.net_amount} disabled/>
	        	</Col>
	        </FormGroup>	        		        
	      </Form>
	      <p>
	      	<button onClick={this.props.handleCompute}>Compute Net Amount</button>
	      	<button onClick={this.props.handleConfirm}>Confirm order</button>
	      </p>
      </div>
		)
	}
}

export default Compute;