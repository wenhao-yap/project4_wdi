import React from 'react';
import { Table,Input,Label,Pagination,Statistic,Image,Icon,Card } from 'semantic-ui-react';
import invoiceIcon from './invoice.png';

class InvoicesList extends React.Component{
  constructor(){
    super();
    this.state = {
      activePage: 1,
      pageOfItems: [],
      itemsPerPage: 5
    };
    this.changePage = this.changePage.bind(this);
  }

  changePage(event,data){
    this.setState({ activePage: data.activePage });
  }

  render() {
    //compute statistics
    let totalRevenue = 0;
    let totalProducts = 0;
    this.props.invoicesData.forEach((item)=>{
      item.quantity.forEach((product,j)=>{
        totalProducts += item.quantity[j];
      })     
      totalRevenue += Number(item.net_amount);
    })
    
    //for pagination
    const lastIndex = this.state.activePage * this.state.itemsPerPage;
    const firstIndex = lastIndex - this.state.itemsPerPage;
    const totalPages = Math.ceil(this.props.invoicesData.length / this.state.itemsPerPage);

	  let rows = this.props.invoicesData.slice(firstIndex,lastIndex).map((item,i) => {
  		let product = item.name.map((product,j)=>{
  				return(
  					<Label color='black' key={product}>{product}
  						<Label.Detail>{item.quantity[j]}</Label.Detail>
  					</Label>
  				)
  			}
  		);
      let date = new Date(item.created_date).toUTCString();

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
          <Table.Cell>{date}</Table.Cell>
				</Table.Row>
			)  		
  	});

    return (
      <div>
        <Statistic.Group>
          <Statistic>
            <Statistic.Value><Image src={invoiceIcon} inline circular />{this.props.invoicesData.length}</Statistic.Value>
            <Statistic.Label>Invoices</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value><Icon name='shopping cart'/>{totalProducts}</Statistic.Value>
            <Statistic.Label>Products Sold</Statistic.Label>
          </Statistic>        
          <Statistic>
            <Statistic.Value>${totalRevenue}</Statistic.Value>
            <Statistic.Label>Total Revenue Earned</Statistic.Label>
          </Statistic>
        </Statistic.Group>

  			<Table celled selectable>
      		<Table.Header>
        		<Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Products(quantity)</Table.HeaderCell>
              <Table.HeaderCell>Gross Amount</Table.HeaderCell>
              <Table.HeaderCell>Net Amount</Table.HeaderCell>
              <Table.HeaderCell>Date Created(UTC)</Table.HeaderCell>
       			</Table.Row>
     		 	</Table.Header>
  				<Table.Body>{rows}</Table.Body>
  			</Table>

        <Pagination
          activePage={this.state.activePage}
          totalPages={totalPages} 
          onPageChange={this.changePage} />
      </div>
    );
  }  
}

export default InvoicesList;