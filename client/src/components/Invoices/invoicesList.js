import React from 'react';
import { Table,Label,Pagination,Statistic,Image,Icon,Header } from 'semantic-ui-react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';
import './invoices.css';
import invoiceIcon from './invoice.png';
import discountIcon from './discount.png';

class InvoicesList extends React.Component{
  constructor(){
    super();
    this.state = {
      activePage: 1,
      pageOfItems: [],
      itemsPerPage: 5,
      dateFrom: undefined,
      dateTo: undefined
    };
    this.changePage = this.changePage.bind(this);
  }

  changePage(e,data){
    this.setState({ activePage: data.activePage });
  }

  //date range
  focusTo(){
    this.timeout = setTimeout(()=>this.to.getInput().focus(),0);
  }
  showFromMonth(){
    const { dateFrom, dateTo } = this.state;
    if(!dateFrom){
      return;
    }
    if (moment(dateTo).diff(moment(dateFrom), 'months') < 2) {
      this.dateTo.getDayPicker().showMonth(dateFrom);
    }
  }
  handleFromChange(dateFrom){
    this.setState({dateFrom});
  }
  handleToChange(dateTo){
    this.setState({dateTo},this.showFromMonth);
  }
  componentWillUnmount(){
    clearTimeout(this.timeout);
  }

  render() {
    //compute statistics
    let totalRevenue = 0;
    let totalProducts = 0;
    let totalDiscount = 0;
    let uniqueProducts = [];
    this.props.invoicesData.forEach((item)=>{
      item.quantity.forEach((product,j)=>{
        totalProducts += item.quantity[j];
      })
      item.name.forEach((product)=>{
        if(!uniqueProducts.includes(product)){
          uniqueProducts.push(product);
        } 
      })
      totalDiscount += Number(item.discount);  
      totalRevenue += Number(item.net_amount);
    })

    //for date range
    const { dateFrom, dateTo } = this.state;
    const modifiers = { start: dateFrom, end: dateTo };    

    //for pagination
    const lastIndex = this.state.activePage * this.state.itemsPerPage;
    const firstIndex = lastIndex - this.state.itemsPerPage;
    const totalPages = Math.ceil(this.props.invoicesData.length / this.state.itemsPerPage);

    //for populating results
    let dateRangeData = this.props.invoicesData;
    if(dateFrom && dateTo){
      this.props.invoicesData.forEach((item,i) => {
        let date = new Date(item.created_date).getTime();
        if (date > this.state.dateFrom.getTime() && date < this.state.dateTo.getTime()) {
          console.log("date is in range");
        }
        else{
          console.log('not in range');
          dateRangeData = dateRangeData.slice(0,i).concat(dateRangeData.slice(i + 1));
        }
      })
    }

	  let rows = dateRangeData.slice(firstIndex,lastIndex).map((item,i) => {
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
					<Table.Cell>${item.gross_amount}</Table.Cell>
          <Table.Cell>${item.discount}</Table.Cell>
          <Table.Cell>${item.net_amount}</Table.Cell>
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
            <Statistic.Value>${totalRevenue}</Statistic.Value>
            <Statistic.Label>Total Revenue Earned</Statistic.Label>
          </Statistic>          
          <Statistic>
            <Statistic.Value><Icon name='shopping cart'/>{totalProducts}</Statistic.Value>
            <Statistic.Label>Products Sold</Statistic.Label>
          </Statistic> 
          <Statistic>
            <Statistic.Value>{uniqueProducts.length}</Statistic.Value>
            <Statistic.Label>Unique Products</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value><Image src={discountIcon} inline circular />${totalDiscount.toFixed(2)}</Statistic.Value>
            <Statistic.Label>Discount Given</Statistic.Label>
          </Statistic>                 
        </Statistic.Group>
        <Header as='h2'>Select Date Range(time is 4am GMT)</Header>
        <div className="InputFromTo">
          <DayPickerInput
            value={dateFrom}
            placeholder="From date"
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [dateFrom, { dateFrom, dateTo }],
              disabledDays: { after: dateTo },
              toMonth: dateTo,
              modifiers,
              numberOfMonths: 2,
              onDayClick: () => this.dateTo.getInput().focus(),
            }}
            onDayChange={(e) => this.handleFromChange(e)}
          />
          <span className="InputFromTo-to">
            <DayPickerInput
              ref={el => (this.dateTo = el)}
              value={dateTo}
              placeholder="To date"
              format="LL"
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [dateFrom, { dateFrom, dateTo }],
                disabledDays: { before: dateFrom },
                modifiers,
                month: dateFrom,
                fromMonth: dateFrom,
                numberOfMonths: 2,
              }}
              onDayChange={(e) => this.handleToChange(e)}
            />
          </span>
        </div>
        <Header as='h4'>Showing {dateRangeData.length} records:</Header>
  			<Table celled selectable>
      		<Table.Header>
        		<Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Products(quantity)</Table.HeaderCell>
              <Table.HeaderCell>Gross Amt</Table.HeaderCell>
              <Table.HeaderCell>Discount</Table.HeaderCell>
              <Table.HeaderCell>Net Amt</Table.HeaderCell>
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