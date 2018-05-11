import React from 'react';

class ProductsList extends React.Component {
  render() {
  	let tableRow = this.props.productsData.map((product) => {
  		return(
		    <tr key={product.id}>
		      <td>{product.id}</td>
		      <td>{product.name}</td>
		      <td>{product.description}</td>
		      <td><a>Edit</a>|<a>Delete</a></td>
		    </tr>
		  )  		
  	});

    return (   	
      <table>
      	<thead>
		      <tr>
		      	<th>ID</th>
		      	<th>Name</th>
		      	<th>Description</th>
		      	<th>Action</th>
		      </tr>
		    </thead>
	      <tbody>{tableRow}</tbody>
      </table>
    );
  }
}

export default ProductsList;