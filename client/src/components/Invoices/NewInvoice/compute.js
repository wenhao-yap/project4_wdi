import React from 'react';
import { Form } from 'semantic-ui-react'

class Compute extends React.Component{

	render(){ 
		return(
			<div className="invoiceCompute">
	      <Form>
	      	<Form.Group widths='equal'>
      			<Form.Input fluid label='Gross Amount' value={this.props.compute.gross_amount} readOnly />
      			<Form.Input fluid label='GST(7%)' value={this.props.compute.GST} readOnly />	      		
	      	</Form.Group>
	      	<Form.Group widths='equal'>
      			<Form.Input fluid label='Discount' onChange={this.props.handleDiscount} />
      			<Form.Input fluid label='Net Amount' value={this.props.compute.net_amount} readOnly />	      		
	      	</Form.Group>        		        
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