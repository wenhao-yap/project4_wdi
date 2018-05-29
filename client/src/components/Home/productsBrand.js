import React from 'react';
import {Doughnut} from 'react-chartjs-2';

class ProductsBrand extends React.Component {
  constructor(){
    super();
    this.state = {
      data : {}
    }
  }  

  componentDidMount() {
    const productsData = this.props.productsData;
    let data = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }]
    };
    productsData.forEach(item => {
      if(item.brand === null || item.brand === ''){
        item.brand = 'Others'
      }
      if(data.labels.includes(item.brand)){
        let index = data.labels.indexOf(item.brand);
        data.datasets[0].data[index] += 1;
      } else {
        data.labels.push(item.brand);
        data.datasets[0].data.push(1);
        let color = this.getRandomColor();
        data.datasets[0].backgroundColor.push(color);
        data.datasets[0].hoverBackgroundColor.push(color);
      }
    })
    this.setState({data: data})
  }

 getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    return (
      <Doughnut data={this.state.data} height={170}/>
    );
  }
}

export default ProductsBrand;