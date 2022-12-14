'use strict';

// ******GLOBALS******

let votesLeft = 25;
let productArray = [];
let indexArray = [];

let chartObj = {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: '# of Votes',
      data: [],
      borderWidth: 1
    },
    {
      label: '# of Views',
      data: [],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

// ******DOM WINDOWS******

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultButton = document.getElementById('results');
let resultContainer = document.getElementById('results-container');

const ctx = document.getElementById('myChart');

// ******CONSTRUCTORS******

function Product(name, imgExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;
}

// *******FUNCTIONS/UTILITIES******

function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImg() {

  while (indexArray.length < 6) {
    let randNum = randomIndex();
    if (!indexArray.includes(randNum)) {
      indexArray.push(randNum);
    }
  }

  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();

  imgOne.src = productArray[imgOneIndex].img;
  imgTwo.src = productArray[imgTwoIndex].img;
  imgThree.src = productArray[imgThreeIndex].img;
  imgOne.title = productArray[imgOneIndex].name;
  imgTwo.title = productArray[imgTwoIndex].name;
  imgThree.title = productArray[imgThreeIndex].name;
  imgOne.alt = `This is an image of ${productArray[imgOneIndex].name}`;
  imgTwo.alt = `This is an image of ${productArray[imgTwoIndex].name}`;
  imgThree.alt = `This is an image of ${productArray[imgThreeIndex].name}`;

  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;
}

// ******EVENT HANDLERS******

function handleClick(event) {

  let imgClicked = event.target.title;

  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].name) {
      productArray[i].votes++;
    }
  }

  votesLeft--;

  renderImg();

  if (votesLeft === 0) {
    imgContainer.removeEventListener('click', handleClick);
  }
}

function handleResults() {
  if (votesLeft === 0) {
    for (let i = 0; i < productArray.length; i++) {
      // let liElem = document.createElement('li');
      // liElem.innerText = `${productArray[i].name} had ${productArray[i].votes} votes and was seen ${productArray[i].views} times.`;
      // resultContainer.appendChild(liElem);
      chartObj.data.labels.push(productArray[i].name);
      chartObj.data.datasets[0].data.push(productArray[i].votes);
      chartObj.data.datasets[1].data.push(productArray[i].views);
    }
    new Chart(ctx, chartObj);
    resultContainer.removeEventListener('click', handleResults);
  }
}

// *******EXECUTABLE CODE*******

let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petSweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 'png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let waterCan = new Product('water-can');
let wineGlass = new Product('wine-glass');

productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);

renderImg();

imgContainer.addEventListener('click', handleClick);
resultButton.addEventListener('click', handleResults);




