'use strict';

var leftImageEl = document.getElementById('left');
var centerImageEl = document.getElementById('center');
var rightImageEl = document.getElementById('right');
var containerEl = document.getElementById('image_container');

// leftImageEl.src = 'images/bag.jpg';
// leftImageEl.name = 'bag.jpg';
// leftImageEl.title = 'bag.jpg';

// rightImageEl.src = 'images/boots.jpg';
// rightImageEl.name = 'boots.jpg';
// rightImageEl.title = 'boots.jpg';
// eslint-disable-next-line no-unused-vars
var voteCounter = 0;
var turnCount = 0;
var allProducts = [];
function Product(name) {
  this.name = name;
  this.path = `images/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
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


function handleClick() {
  var chosenImage = event.target.title;
  turnCount ++;
  console.log('chosenImage: ', chosenImage);
  for( var i = 0; i < allProducts.length; i++ ) {
    if(allProducts[i].name === chosenImage) {
      allProducts[i].votes++;
      if(voteCounter === 3) {
        containerEl.removeEventListener('click', handleClick, true);
      }
      while (turnCount === 25) {
        containerEl.removeEventListener('click', handleClick, true);
      }
    }

  }


  renderProducts();
  listEl.innerHTML = '';
  render();
  voteCounter++;
}

while(allProducts.votes === 3 ) {
  alert('25 has been reached');
}


containerEl.addEventListener('click', handleClick);


renderProducts();



var listEl = document.getElementById('list');
var listchild = document.createElement('h1');
listchild.textContent = 'Stats' ;
listEl.appendChild.listchild;
function render() {
  for (var i=0; i < allProducts.length; i++) {
    var listchild = document.createElement('li');
    listchild.textContent = `Product: ${allProducts[i].name} Views: ${allProducts[i].views} Votes ${allProducts[i].votes}`;
    listEl.appendChild(listchild);
  }
}

render();
