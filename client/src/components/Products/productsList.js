import React from 'react';
import {postAPI,deleteAPI} from '../../Util';
import { Button, Checkbox, Table, Container, Input } from 'semantic-ui-react'
import './products.css';

class ProductsList extends React.Component {

	// deleteCell(event){
	// 	console.log(this.state.deleteProduct);
	// 	deleteAPI('/api/products/delete',this.state.deleteProduct);
	// 	this.props.handleRemove(this.state.deleteProduct);
	// 	this.setState({deleteProduct:{}});
	// }

  render() {
    let rows = this.props.productsData.map((item,i) => {
      if(this.props.editMode){
				return(
					<Table.Row key={i}>
        		<Table.Cell collapsing><Checkbox slider /></Table.Cell>
          	<Table.Cell>{item.id}</Table.Cell>	
		    		<Table.Cell>
		    			<Input type="text"
		    				name={"name_" + i} 
		    				value={item.name}
		    				onChange={this.props.handleEditCell}
		    				onKeyDown={this.props.keyPressEditCell}
		    				size='small' 
		    				className='newInvoiceField'/>
		    		</Table.Cell>
	          <Table.Cell>
	          	<Input type="text"
	          		name={"description_" + i} 
	          		value={item.description}
	          		onChange={this.props.handleEditCell}
	          		onKeyDown={this.props.keyPressEditCell}
	          		size='small' 
	          		className='newInvoiceField'/>
	          </Table.Cell>
	          <Table.Cell>
	          	<Input type="text"
	          		name={"price_" + i} 
	          		value={item.price}
	          		onChange={this.props.handleEditCell}
	          		onKeyDown={this.props.keyPressEditCell}
	          		size='small' 
	          		className='newInvoiceField'/>
	          </Table.Cell>
	          <Table.Cell>
	          	<Input type="text"
	          		name={"quantity_" + i}
	          		value={item.quantity}
	          		onChange={this.props.handleEditCell}
	          		onKeyDown={this.props.keyPressEditCell}
	          		size='small' 
	          		className='newInvoiceField'/>
	          </Table.Cell>
          </Table.Row>					
				)      	
      } else {
      	return(
					<Table.Row key={i}>
        		<Table.Cell collapsing><Checkbox slider /></Table.Cell>
          	<Table.Cell>{item.id}</Table.Cell>		    			
		    		<Table.Cell>{item.name}</Table.Cell>
	          <Table.Cell>{item.description}</Table.Cell>
	          <Table.Cell>{item.price}</Table.Cell>
	          <Table.Cell>{item.quantity}</Table.Cell>
          </Table.Row>
      	) 
      }    
    });  	

	  return (
	    <Container>
	    	<h1>*Impt* After editing, press enter to submit data to server</h1> 
	      <Table compact celled definition>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell />
			        <Table.HeaderCell>#</Table.HeaderCell>
			        <Table.HeaderCell>Name</Table.HeaderCell>
			        <Table.HeaderCell>Description</Table.HeaderCell>
			        <Table.HeaderCell>Price</Table.HeaderCell>
			        <Table.HeaderCell>Quantity</Table.HeaderCell>
			      </Table.Row>
			    </Table.Header>

			    <Table.Body>{rows}</Table.Body>

			    <Table.Footer fullWidth>
			      <Table.Row>
			        <Table.HeaderCell />
			        <Table.HeaderCell colSpan='5'>
			          <Button size='small' onClick= {this.props.handleMode} >Edit Mode</Button>
			          <Button size='small'>Add product</Button>
			          <Button size='small'>Approve</Button>
			          <Button disabled size='small'>Approve All</Button>
			        </Table.HeaderCell>
			      </Table.Row>
			    </Table.Footer>
			  </Table>   			
	    </Container>
	  );
	}
}

export default ProductsList;