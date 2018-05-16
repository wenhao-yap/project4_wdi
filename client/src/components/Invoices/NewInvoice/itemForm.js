import React from 'react';
import { Table,Input,Button,Dropdown } from 'semantic-ui-react';
import './invoice.css';

class ItemForm extends React.Component{

	render(){ 
		let rows = this.props.items.map((item,i) => {
			let productOptions = [];

			this.props.productsData.forEach(product => {
	  		let option = {
	  			key:product.id,
	  			value:JSON.stringify(product),
	  			text:product.name
	  		}
	  		productOptions.push(option);
	  	})
			let quantity = "quantity_" + i;
			return(
				<Table.Row key={i+1}>
					<Table.Cell>{i+1}</Table.Cell>
					<Table.Cell>
            <Dropdown
            	placeholder='Choose product' 
            	options={productOptions}
            	text={this.props.items[i].name}
            	search
            	selection
            	noResultsMessage='Try another search.' 
            	onChange={this.props.handleSelect.bind(this,i)}/>
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
					<Table.Cell><Button icon='trash' onClick={this.props.removeRow.bind(this,i)} className="black"/></Table.Cell>
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