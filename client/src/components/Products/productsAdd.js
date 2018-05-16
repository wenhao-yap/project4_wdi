import React from 'react';
import { Form } from 'semantic-ui-react'

class ProductsAdd extends React.Component {
  render() {
    return (
			<Form>
				<Form.Group widths='equal'>
					<Form.Input fluid label='Product Name' type='text' name='name' onChange={this.props.handleChange}/>
					<Form.Input fluid label='Price(SGD)' type='text' name='price' onChange={this.props.handleChange}/>
					<Form.Input fluid label='Quantity' type='text' name='quantity' onChange={this.props.handleChange}/>
				</Form.Group>
				<Form.TextArea label='Description' type='text' name='description' onChange={this.props.handleChange}/>
			</Form>            
    );
  }
}

export default ProductsAdd;