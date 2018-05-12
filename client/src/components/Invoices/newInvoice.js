import React from 'react';

class NewInvoice extends React.Component {

  render() {
  	let products = this.props.productsData.map(item => {
  		let itemStr = JSON.stringify(item);
  		return(
  			<option key={item.id} value={itemStr}>{item.name}(${item.price})</option>
  		)
  	})

  	return(
      <form onSubmit={this.props.handleSubmit}>
        <label>
          Select Product:
          <select onChange={this.props.handleSelect}>
          	{products}
          </select>
        </label>
        <input type="submit" value="Add item" />
      </form>
  	);
  }
}
export default NewInvoice;