import React from 'react';
import { Pagination,Header } from 'semantic-ui-react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';
import './invoices.css';
import InvoicesStats from './invoicesStats';
import InvoicesTable from './invoicesTable';

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
    if(!dateFrom){return;}
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
    //for date range
    const { dateFrom, dateTo } = this.state;
    const modifiers = { start: dateFrom, end: dateTo }; 

    //for setting date range for results
    let dateRangeData = this.props.invoicesData;
    if(dateFrom && dateTo){
      this.props.invoicesData.forEach((item,i) => {
        let date = new Date(item.created_date).getTime();
        if (date > this.state.dateFrom.getTime() && date < this.state.dateTo.getTime()) {
        }
        else{
          dateRangeData = dateRangeData.slice(0,i).concat(dateRangeData.slice(i + 1));
        }
      })
    }

    //for pagination
    const lastIndex = this.state.activePage * this.state.itemsPerPage;
    const firstIndex = lastIndex - this.state.itemsPerPage;
    const totalPages = Math.ceil(dateRangeData.length / this.state.itemsPerPage);

    return (
      <div>
        <Header as='h1'>Select Date Range(time is 4am GMT)</Header>
        <div className="InputFromTo">
          <DayPickerInput
            value={dateFrom}
            placeholder="From date.."
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
              placeholder="To date.."
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
        <Header as='h2'>Statistics</Header>      
        <InvoicesStats dateRangeData={dateRangeData}/>
        <Header as='h2'>Records</Header>
        <InvoicesTable
          lastIndex = {lastIndex}
          firstIndex = {firstIndex} 
          dateRangeData={dateRangeData}/>
        <Pagination
          activePage={this.state.activePage}
          totalPages={totalPages} 
          onPageChange={this.changePage} />
      </div>
    );
  }  
}

export default InvoicesList;