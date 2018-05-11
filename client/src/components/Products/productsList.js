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
			  text: 'Product Description',
			  align: 'center',
			  filter: textFilter(),
			  sort: true
			}
		]

		const selectRow = {
		  mode: 'checkbox',
		  clickToSelect: true,
		  clickToEdit: true,
		  selected: false,
		  onSelect: (row, isSelect, rowIndex, e) => {
		    console.log(row.id);
		    console.log(isSelect);
		    console.log(rowIndex);
		    console.log(e);
		  },
		  onSelectAll: (isSelect, rows, e) => {
		    console.log(isSelect);
		    console.log(rows);
		    console.log(e);
		  }		  
		};

	  return (
	    <div className="container"> 
	    	{this.state.updateProduct.length === undefined ? 
	    		(<h3>{this.state.cellHistory} has been updated sucessfully to {this.state.updateProduct.name}!</h3>):
	    		(<h3>Hint: Double click cell to edit and press enter to confirm!</h3>)} 	
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
		    	hover condensed
		    	noDataIndication="Table is Empty" 
	    	/>
	    </div>
	  );
	}
}

export default ProductsList;