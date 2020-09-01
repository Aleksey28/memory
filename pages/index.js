const boxColors = [
  '#ffc0cb',
  '#f0e68c',
  '#1e90ff',
  '#0000ff',
  '#00fa9a',
  '#ffff00',
  '#00ff00',
  '#ff00ff',
  '#da70d6',
  '#ffa500',
  '#ff0000',
  '#48d1cc',
  '#000080',
  '#006400',
  '#a0522d',
  '#2f4f4f'];
const emptyBoxNumbers = [1, 2, 3, 4];

const boxes = document.querySelector('.boxes');
const boxTemplate = document.querySelector('#box-template').content;

const generateCouples = (widthBox, heightBox) => {
  const countOfBoxes = widthBox * heightBox;
  const countOfCouples = countOfBoxes / 2;
  const arrCouples = [];

  const randomIntArray = getRandomIntArray(0, countOfBoxes);

  for(let i = 0; i < countOfCouples; i++) {

    const couple = {};
    couple.color = boxColors[i];
    couple.firstIndex = randomIntArray[i*2];
    couple.secondIndex = randomIntArray[i*2+1];
    arrCouples.push(couple)
  }

  return arrCouples;
}

const getRandomIntArray = (from, to) => {
  const orderedArr = [];
  const randomArr = [];
  for(let i = from; i < to; i++) {
    orderedArr.push(i);
  }

  for(let i = from; i < to; i++) {
    let randIndex = Math.floor(Math.random()*orderedArr.length);
    randomArr.push(orderedArr[randIndex]);
    orderedArr.splice(randIndex, 1);
  }

  return randomArr;
}

const addBox = (backgroundColor, order) => {
  boxElement = boxTemplate.cloneNode(true);
  box = boxElement.querySelector('.box');
  box.style.backgroundColor = backgroundColor;
  box.style.order = order;

  boxes.append(boxElement);
}

// boxColors.forEach((color) => {
//   const firstBoxIndexNumber = Math.floor(Math.random()*emptyBoxNumbers.length);
//   const firstBoxNumber = emptyBoxNumbers[firstBoxIndexNumber];
//   delete emptyBoxNumbers[firstBoxIndexNumber];
//   addBox(color, firstBoxIndexNumber);
//
//   const secondBoxIndexNumber = Math.floor(Math.random()*emptyBoxNumbers.length);
//   const secondBoxNumber = emptyBoxNumbers[secondBoxIndexNumber];
//   delete emptyBoxNumbers[secondBoxIndexNumber];
//   addBox(color, secondBoxNumber);
// })

console.log(generateCouples(2,2));
