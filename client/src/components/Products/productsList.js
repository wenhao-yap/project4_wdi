import React from 'react';
import {postAPI,tableOptions} from '../../Util';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

class ProductsList extends React.Component {
	constructor(){
		super();
		this.state = {
			updateProduct: [],
			cellHistory: ''
		};
	}

	onAfterSaveCell(value, changed, newRow){
		console.log("Selected cell with value: " + value);
		console.log(newRow);
		this.setState({updateProduct:newRow, cellHistory:value});
		postAPI('/api/products/edit',newRow);
	}

  render() {
  	const columns = [
  		{
			  dataField: 'id',
			  text: 'Product ID',
			  headerAlign: 'center',
			  sort: true
			}, {
			  dataField: 'name',
			  text: 'Product Name',
			  filter: textFilter(),
			  sort: true
			}, {
			  dataField: 'description',
			  text: 'Product Description',
			  filter: textFilter(),
			  sort: true
			}
		]

	  return (
	    <div className="container"> 
	    	{this.state.updateProduct.length === undefined ? 
	    		(<h3>{this.state.cellHistory} has been updated sucessfully to {this.state.updateProduct.name}!</h3>):
	    		(<h3>Hint: Click the cell to edit its value!</h3>)} 	
	    	<BootstrapTable 
		    	keyField='id' 
		    	data={ this.props.productsData } 
		    	columns={ columns }
		    	cellEdit={ cellEditFactory({ 
		    		mode: 'click',
		    		afterSaveCell: this.onAfterSaveCell.bind(this) 
		    	}) }
		    	filter={ filterFactory() }
		    	pagination={ paginationFactory(tableOptions) }
		    	hover condensed 
	    	/>
	    </div>
	  );
	}
}

export default ProductsList;