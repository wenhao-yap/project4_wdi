import React from 'react';

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
	  			<option key={product.id} value={productStr}>{product.name}</option>
	  		)	
	  	})
			let quantity = "quantity_" + i;
			item.index = i;
			let itemStr = JSON.stringify(item);
			return(
				<tr key={i+1}>
					<td>{i+1}</td>
					<td>
            <select defaultValue="" onChange={this.props.handleSelect}>
            	<option value="" disabled> </option>
            	{products}
            </select>
					</td>
					<td>{item.price}</td>
					<td><input type="text" name={quantity} onChange={this.props.handleChange}/></td>
					<td>{item.amount}</td>
					<td><button name={itemStr} onClick={this.props.removeRow}>Delete</button></td>
				</tr>
			)
		})

		return(
			<tbody>{rows}</tbody>
		)
	}
}

export default ItemForm;