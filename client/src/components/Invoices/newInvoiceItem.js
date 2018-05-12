import React from 'react';

class NewInvoiceItem extends React.Component {

  render() {
  	let products = this.props.productsData.map(item => {
  		let itemStr = JSON.stringify(item);
  		return(
  			<option key={item.id} value={itemStr}>{item.name}(${item.price})</option>
  		)
  	})   

  	return(
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <label>Product:
            <select defaultValue="" onChange={this.props.handleSelect}>
            <option value="" disabled> -- select an option -- </option>
            	{products}
            </select>
          </label>
          <label> Quantity:
            <input 
              type='text' 
              name='name' 
              onChange={this.props.handleChange}/>
          </label>
          <input type="submit" value="Add item" />
        </form>
        <h3> Cost: {isNaN(this.props.invoice_item.cost) === false && 
          <span> ${this.props.invoice_item.cost}</span>} </h3>      
      </div>
  	);
  }
}
export default NewInvoiceItem;