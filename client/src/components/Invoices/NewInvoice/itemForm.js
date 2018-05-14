import React from 'react';
import { Table,Input,Button } from 'semantic-ui-react';
import './invoice.css';

class ItemForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			productsAvailable:props.productsData
		}
	}

	render(){ 
		let rows = this.props.items.map((item,i) => {
			let products = this.state.productsAvailable.map(product => {
				product.index = i;
	  		let productStr = JSON.stringify(product);
	  		return(
	  			<option key={product.id} value={productStr}>{product.name}({product.quantity})</option>
	  		)	
	  	})
			let quantity = "quantity_" + i;
			item.index = i;
			let itemStr = JSON.stringify(item);
			return(
				<Table.Row key={i+1}>
					<Table.Cell>{i+1}</Table.Cell>
					<Table.Cell>
            <select defaultValue="" onChange={this.props.handleSelect} className="newInvoiceField selectField">
            	<option value="" disabled> </option>
            	{products}
            </select>
					</Table.Cell>
					<Table.Cell>
						<Input type="text" value={item.price} size='small' label={{content:'$'}} labelPosition='left' disabled className="newInvoiceField"/>
					</Table.Cell>
					<Table.Cell>
						<Input type="text" name={quantity} onChange={this.props.handleChange} size='small' label={{ icon: 'asterisk' }} labelPosition='right corner' placeholder='Enter quantity...' className="newInvoiceField"/>
					</Table.Cell>
					<Table.Cell>
						<Input type="text" value={item.amount} size='small' label={{content:'$'}} labelPosition='left' disabled className="newInvoiceField"/>
					</Table.Cell>
					<Table.Cell><Button icon='trash' name={itemStr} onClick={this.props.removeRow} className="black"/></Table.Cell>
				</Table.Row>
			)
		})

		return(
	  	<Table celled selectable>
    		<Table.Header>
      		<Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>
            	<Button icon='add' onClick={this.props.addRow} className="blue"/>
            </Table.HeaderCell>
     			</Table.Row>
   		 	</Table.Header>
				<Table.Body>{rows}</Table.Body>
			</Table>
		)
	}
}

export default ItemForm;