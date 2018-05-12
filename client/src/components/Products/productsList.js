import React from 'react';
import {postAPI,tableOptions,deleteAPI} from '../../Util';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, {textFilter,numberFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

class ProductsList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			updateProduct: {},
			deleteProduct: {}
		};
	}

	onAfterSaveCell(value, changed, newRow){
		console.log("Selected cell with value: " + value);
    	newRow.price = parseFloat(newRow.price);
    	newRow.quantity = parseInt(newRow.quantity,10);
		console.log(newRow);
		this.setState({updateProduct:newRow});
		postAPI('/api/products/edit',newRow);
	}

	deleteCell(event){
		console.log(this.state.deleteProduct);
		deleteAPI('/api/products/delete',this.state.deleteProduct);
		this.props.handleRemove(this.state.deleteProduct);
		this.setState({deleteProduct:{}});
	}

  render() {
  	const columns = [
  		{
			  dataField: 'id',
			  text: 'ID',
			  headerAlign: 'center',
			  align: 'center',
			  sort: true
			}, {
			  dataField: 'name',
			  text: 'Product Name',
			  align: 'center',
			  filter: textFilter(),
			  sort: true
			}, {
			  dataField: 'description',
			  text: 'Description',
			  align: 'center',
			  filter: textFilter(),
			  sort: true
			}, {
			  dataField: 'price',
			  text: 'Price(SGD)',
			  align: 'center',
			  filter: numberFilter(),
			  sort: true
			}, {
			  dataField: 'quantity',
			  text: 'Quantity',
			  align: 'center',
			  filter: numberFilter(),
			  sort: true
			}
		]

		const selectRow = {
		  mode: 'radio',
		  clickToSelect: true,
		  clickToEdit: true
		};

		const rowEvents = {
		  onClick: (e, row, rowIndex) => {
		    this.setState({deleteProduct:row})
		  }
		};

	  return (
	    <div className="container"> 
	    	{Object.keys(this.state.updateProduct).length === 0 && this.state.updateProduct.constructor === Object ? 
	    		(<h3>Hint: Double click cell to edit and press enter to confirm!</h3>):
	    		(<h3>Updated {this.state.updateProduct.name} sucessfully!</h3>)} 	    			
	    	<button onClick={(e) => this.deleteCell(e)} >Delete</button>
	    	<BootstrapTable 
		    	keyField='id' 
		    	data={ this.props.productsData } 
		    	columns={ columns }
		    	cellEdit={ cellEditFactory({ 
		    		mode: 'dbclick',
		    		afterSaveCell: this.onAfterSaveCell.bind(this) 
		    	}) }
		    	filter={ filterFactory() }
		    	pagination={ paginationFactory(tableOptions) }
		    	selectRow={ selectRow }
		    	rowEvents={ rowEvents }
		    	hover condensed
		    	noDataIndication="Table is Empty" 
	    	/>
	    </div>
	  );
	}
}

export default ProductsList;