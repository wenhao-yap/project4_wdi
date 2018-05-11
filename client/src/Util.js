export let getAPI = (url,callback) => {
  fetch(url)
  .then((response) => {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
      response.status);
      return;
    }
    response.json().then((data) =>{
      console.log("fetching data");
      callback(data); //make sure to return something
    });
  })
  .catch((err) => {
    console.log('Fetch Error :-S', err);
  });
}

export let postAPI = (url,data) => {
  fetch(url,{
    method:'POST',
    body: JSON.stringify(data),
    headers: new Headers({'Content-Type': 'application/json'})
  })
  .then(response => {
  if (response.status >= 400) {
    throw new Error("Bad response from server");
  }
  return response.json();       
  }).catch(error => console.error('Error:', error));
}

export const tableOptions = {
  paginationSize: 4,
  pageStartIndex: 0,
  alwaysShowAllBtns: true, // Always show next and previous button
  // withFirstAndLast: false, // Hide the going to First and Last page button
  // hideSizePerPage: true, // Hide the sizePerPage dropdown always
  hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
  firstPageText: 'First',
  prePageText: 'Back',
  nextPageText: 'Next',
  lastPageText: 'Last',
  nextPageTitle: 'First page',
  prePageTitle: 'Pre page',
  firstPageTitle: 'Next page',
  lastPageTitle: 'Last page',
  sizePerPageList: [{
    text: '5', value: 5
  }, {
    text: '10', value: 10
  }, {
    text: 'All', value: 30
  }] // A numeric array is also available. the purpose of above example is custom the text
};



