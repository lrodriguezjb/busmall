'use strict';

var leftImageEl = document.getElementById('left');
var centerImageEl = document.getElementById('center');
var rightImageEl = document.getElementById('right');
var containerEl = document.getElementById('image_container');
var names = [];


// ------------------------------------------------------
function voteResult() {

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: voteCal(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// --------------------------------------------------------
var voteCounter = 0;
var turnCount = 0;
var allProducts = [];

function Product(name, views=0, votes=0) {
  this.name = name;
  this.path = `images/${name}.jpg`;
  this.views = views;
  this.votes = votes;
  allProducts.push(this);
  voteCounter = this.votes;
}

function makeRandom() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  //create an array to hold unique indexes
  var uniquePicsArray = [];
  //assign values to index 0 and 1
  uniquePicsArray[0] = makeRandom();
  uniquePicsArray[1] = makeRandom();
  uniquePicsArray[2] = makeRandom();

  while(uniquePicsArray[0] === uniquePicsArray[1]) {
    console.error('Duplicate found, Re-rolling!');
    uniquePicsArray[1] = makeRandom();
  }

  while (uniquePicsArray[0] === uniquePicsArray[2]) {
    console.error('Duplicate found, Re-Rolling! 2');
    uniquePicsArray[2] = makeRandom();
  }

  while (uniquePicsArray[1] === uniquePicsArray[2]) {
    console.error('Duplicate found, Re-Rolling! 3');
    uniquePicsArray[2] = makeRandom();
  }

  //add views here
  allProducts[uniquePicsArray[0]].views++ ;
  //get a random index
  //display a product whose index is the random number
  leftImageEl.src = allProducts[uniquePicsArray[0]].path;
  leftImageEl.name = allProducts[uniquePicsArray[0]].name;
  leftImageEl.title = allProducts[uniquePicsArray[0]].name;

  allProducts[uniquePicsArray[2]].views++;
  centerImageEl.src = allProducts[uniquePicsArray[2]].path;
  centerImageEl.name = allProducts[uniquePicsArray[2]].name;
  centerImageEl.title = allProducts[uniquePicsArray[2]].name;
  //add views here
  allProducts[uniquePicsArray[1]].views++ ;
  rightImageEl.src = allProducts[uniquePicsArray[1]].path;
  rightImageEl.name = allProducts[uniquePicsArray[1]].name;
  rightImageEl.title = allProducts[uniquePicsArray[1]].name;
}

if (localStorage.data) {
  console.log('found data!!');
  dataInStorage();
//   console.log(allProducts);
} else {
  console.log('Creating New Data!!');
  new Product('bag');
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('usb');
  new Product('water-can');
  new Product('wine-glass');
//   storage();
}

for (var i = 0; i < allProducts.length; i++) {
  names.push(allProducts[i].name);
}


function handleClick() {
  var chosenImage = event.target.title;
  turnCount ++;
  console.log('chosenImage: ', chosenImage);
  for( var i = 0; i < allProducts.length; i++ ) {
    if(allProducts[i].name === chosenImage) {
      allProducts[i].votes++;
      storage();

      // if(turnCount === 3) {
      //   containerEl.removeEventListener('click', handleClick, true);
      // }
    }
    if (turnCount === 5) {
      containerEl.remove();
      voteCal();
      voteResult();
      //   render();
      return;
    }

  }

  renderProducts();
  //   listEl.innerHTML = '';
  voteCounter++;
}

function voteCal(){
  var voteTotal = [];
  for (var i = 0; i < allProducts.length; i++) {
    voteTotal.push(allProducts[i].votes);
  }
  //   console.log('The Total Votes', voteTotal);
  return voteTotal;
}

containerEl.addEventListener('click', handleClick);

renderProducts();

function storage() {
  var stringifiedData = JSON.stringify(allProducts);
  localStorage.setItem('data', stringifiedData);
}

function dataInStorage() {
  var amountOfProducts = localStorage.getItem('data');
  var parsedProducts = JSON.parse(amountOfProducts);
  //at this point the products have views and votes
  console.log('parsedProducts: ', parsedProducts);
  for (var i = 0; i < parsedProducts.length; i++) {
    new Product(parsedProducts[i].name, parsedProducts[i].views, parsedProducts[i].votes);
  }
  //now the products do not have views and votes
  console.log('allProducts: ', allProducts);
}
