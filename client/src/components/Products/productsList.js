import React from 'react';
import { Button, Checkbox, Table, Container, Input, Pagination, Icon } from 'semantic-ui-react'
import './products.css';

class ProductsList extends React.Component {
	  constructor(){
    super();
    this.state = {
      activePage: 1,
      pageOfItems: [],
      itemsPerPage: 6
    };
    this.changePage = this.changePage.bind(this);
  }

  changePage(e,data){
    this.setState({ activePage: data.activePage });
  }

  render() {
  	//for pagination
    const lastIndex = this.state.activePage * this.state.itemsPerPage;
    const firstIndex = lastIndex - this.state.itemsPerPage;
    const totalPages = Math.ceil(this.props.productsData.length / this.state.itemsPerPage);

    let rows = this.props.productsData.slice(firstIndex,lastIndex).map((item,i) => {
      if(this.props.editMode){
				return(
					<Table.Row key={item.id}>
        		<Table.Cell collapsing><Checkbox toggle name={item.id.toString()} onChange={this.props.selectDelete}/></Table.Cell>
          	<Table.Cell>{item.id}</Table.Cell>	
		    		<Table.Cell>
		    			<Input type="text"
		    				name={"name_" + item.id} 
		    				value={item.name}
		    				onChange={this.props.handleEditCell}
		    				onKeyDown={this.props.keyPressEditCell}
		    				size='small' 
		    				className='newInvoiceField'/>
		    		</Table.Cell>
		    		<Table.Cell>
		    			<Input type="text"
		    				name={"brand_" + item.id} 
		    				value={item.brand || ''}
		    				onChange={this.props.handleEditCell}
		    				onKeyDown={this.props.keyPressEditCell}
		    				size='small' 
		    				className='newInvoiceField'/>
		    		</Table.Cell>		    		
	          <Table.Cell>
	          	<Input type="text"
	          		name={"description_" + item.id} 
	          		value={item.description}
	          		onChange={this.props.handleEditCell}
	          		onKeyDown={this.props.keyPressEditCell}
	          		size='small' 
	          		className='newInvoiceField'/>
	          </Table.Cell>
	          <Table.Cell>
	          	<Input type="text"
	          		name={"price_" + item.id} 
	          		value={item.price}
	          		onChange={this.props.handleEditCell}
	          		onKeyDown={this.props.keyPressEditCell}
	          		size='small'
	          		label={{content:'$'}} labelPosition='left' 
	          		className='newInvoiceField'/>
	          </Table.Cell>
	          <Table.Cell>
	          	<Input type="text"
	          		name={"quantity_" + item.id}
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
					<Table.Row key={item.id}>
        		<Table.Cell collapsing><Checkbox toggle name={item.id.toString()} onChange={this.props.selectDelete}/></Table.Cell>
          	<Table.Cell>{item.id}</Table.Cell>		    			
		    		<Table.Cell>{item.name}</Table.Cell>
		    		<Table.Cell>{item.brand}</Table.Cell>
	          <Table.Cell>{item.description}</Table.Cell>
	          <Table.Cell>${item.price}</Table.Cell>
	          <Table.Cell>{item.quantity}</Table.Cell>
          </Table.Row>
      	) 
      }    
    });  	

	  return (
	    <Container>
	    	<h1>*Impt* After editing, press enter to submit data to server</h1>
	    	<h3>Deletion is in alpha stage. Please refrain from deleting products already in invoices </h3> 
	      <Table compact celled definition>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell />
			        <Table.HeaderCell>#</Table.HeaderCell>
			        <Table.HeaderCell>Product Name</Table.HeaderCell>
			        <Table.HeaderCell>Brand</Table.HeaderCell>
			        <Table.HeaderCell>Description</Table.HeaderCell>
			        <Table.HeaderCell>Price</Table.HeaderCell>
			        <Table.HeaderCell>Quantity</Table.HeaderCell>
			      </Table.Row>
			    </Table.Header>

			    <Table.Body>{rows}</Table.Body>

			    <Table.Footer fullWidth>
			      <Table.Row>
			        <Table.HeaderCell />
			        <Table.HeaderCell colSpan='6'>
			          <Button size='small' onClick= {this.props.handleMode} >Edit Mode</Button>
			          <Button size='small' onClick= {this.props.handleOpen}>Add product</Button>
			          {this.props.deleteStore.length > 0 ? (
        					<Button size='small' className="black" onClick={this.props.handleDelete}><Icon name='trash' />Delete</Button>
      					) : (
        					<Button size='small' disabled>Delete</Button>
      					)}
			          <Pagination activePage={this.state.activePage} 
			          	totalPages={totalPages} 
			          	onPageChange={this.changePage}
			          	className='paginationRight'/> 
			        </Table.HeaderCell>
			      </Table.Row>
			    </Table.Footer>
			  </Table>  			
	    </Container>
	  );
	}
}

export default ProductsList;