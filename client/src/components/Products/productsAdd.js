import React from 'react';

class ProductsAdd extends React.Component {
  render() {
    return (
		<div className='AddForm'>
			<h1> Add product here </h1>
			<form onSubmit={this.props.handleSubmit}>
				<label> Product Name:
					<input 
						type='text' 
						name='name' 
						onChange={this.props.handleChange}/>
				</label><br/>
				<label> Product Description:
					<input 
						type='text' 
						name='description' 
						onChange={this.props.handleChange}/>
				</label><br/>
				<input type='submit' value="Add product"/>
			</form>            
		</div>
    );
  }
}

export default ProductsAdd;