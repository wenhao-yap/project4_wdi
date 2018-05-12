import React from 'react';

class ProductsAdd extends React.Component {
  render() {
    return (
		<div className='AddForm'>
			<form onSubmit={this.props.handleSubmit}>
				<label> Product Name:
					<input 
						type='text' 
						name='name' 
						onChange={this.props.handleChange}/>
				</label><br/>
				<label> Description:
					<input 
						type='text' 
						name='description' 
						onChange={this.props.handleChange}/>
				</label><br/>
				<label> Price(SGD):
					<input 
						type='text' 
						name='price' 
						onChange={this.props.handleChange}/>
				</label><br/>
				<label> Quantity:
					<input 
						type='text' 
						name='quantity' 
						onChange={this.props.handleChange}/>
				</label><br/>
				<input type='submit' value="Add product"/>
			</form>            
		</div>
    );
  }
}

export default ProductsAdd;