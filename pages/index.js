const boxColors = ['#191970', '#006400'];
const emptyBoxNumbers = [1, 2, 3, 4];

const boxes = document.querySelector('.boxes');
const boxTemplate = document.querySelector('#box-template').content;

const addBox = (backgroundColor, order) => {
  boxElement = boxTemplate.cloneNode(true);
  box = boxElement.querySelector('.box');
  box.style.backgroundColor = backgroundColor;
  box.style.order = order;

  boxes.append(boxElement);
}

boxColors.forEach((color) => {
  const firstBoxIndexNumber = Math.floor(Math.random()*emptyBoxNumbers.length);
  const firstBoxNumber = emptyBoxNumbers[firstBoxIndexNumber];
  delete emptyBoxNumbers[firstBoxIndexNumber];
  addBox(color, firstBoxIndexNumber);

  const secondBoxIndexNumber = Math.floor(Math.random()*emptyBoxNumbers.length);
  const secondBoxNumber = emptyBoxNumbers[secondBoxIndexNumber];
  delete emptyBoxNumbers[secondBoxIndexNumber];
  addBox(color, secondBoxNumber);
})
