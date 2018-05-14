import React from 'react';
import { Table,Input,Label} from 'semantic-ui-react';

class InvoicesList extends React.Component{
  render() {
	  let rows = this.props.invoicesData.map((item,i) => {
  		let product = item.name.map((product,j)=>{
  				return(
  					<Label color='black' key={product}>{product}
  						<Label.Detail>{item.quantity[j]}</Label.Detail>
  					</Label>
  				)
  			}
  		);
			return(
				<Table.Row key={i}>
					<Table.Cell>{item.id}</Table.Cell>
					<Table.Cell>{product}</Table.Cell>
					<Table.Cell>
						<Input type="text" value={item.gross_amount} size='small' label={{content:'$'}} labelPosition='left' readOnly className="newInvoiceField"/>
					</Table.Cell>
					<Table.Cell>
						<Input type="text" value={item.net_amount} size='small' label={{content:'$'}} labelPosition='left' readOnly className="newInvoiceField"/>
					</Table.Cell>
          <Table.Cell>{item.created_date}</Table.Cell>
				</Table.Row>
			)  		
  	});
    return (
			<Table celled selectable>
    		<Table.Header>
      		<Table.Row>
            <Table.HeaderCell>Billing Number</Table.HeaderCell>
            <Table.HeaderCell>Products(quantity)</Table.HeaderCell>
            <Table.HeaderCell>Gross Amount</Table.HeaderCell>
            <Table.HeaderCell>Net Amount</Table.HeaderCell>
            <Table.HeaderCell>Date Created</Table.HeaderCell>
     			</Table.Row>
   		 	</Table.Header>
				<Table.Body>{rows}</Table.Body>
			</Table>
    );
  }  
}

export default InvoicesList;