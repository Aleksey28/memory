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

const couples = {
  arrCouples: [],
  arrElementsCouple: []
};

const boxes = document.querySelector('.boxes');
const boxTemplate = document.querySelector('#box-template').content;
const settings = document.querySelector('.settings');
const settingsWidth = settings.querySelector('.settings__width');
const settingsHeight = settings.querySelector('.settings__height');

const getRandomIntArray = (from, to) => {
  const orderedArr = [];
  const randomArr = [];
  for (let i = from; i < to; i++) {
    orderedArr.push(i);
  }

  for (let i = from; i < to; i++) {
    let randIndex = Math.floor(Math.random() * orderedArr.length);
    randomArr.push(orderedArr[randIndex]);
    orderedArr.splice(randIndex, 1);
  }

  return randomArr;
}

const generateCouples = (widthBox, heightBox) => {
  const countOfBoxes = widthBox * heightBox;
  const countOfCouples = countOfBoxes / 2;
  const arrCouples = [];

  const randomIntArray = getRandomIntArray(0, countOfBoxes);

  for (let i = 0; i < countOfCouples; i++) {
    const couple = {};
    couple.color = boxColors[i];
    couple.firstIndex = randomIntArray[i * 2];
    couple.secondIndex = randomIntArray[i * 2 + 1];
    arrCouples.push(couple)
  }

  return arrCouples;
}

const getElementsCouple = (arrCouples) => {
  const arrElementsCouple = [];

  for (let i = 0; i < arrCouples.length; i++) {
    arrElementsCouple[arrCouples[i].firstIndex] = i;
    arrElementsCouple[arrCouples[i].secondIndex] = i;
  }

  return arrElementsCouple;
};

const openBox = (evt) => {

  if (Array.from(boxes.querySelectorAll('.box_opened')).length === 2) {
    return
  }
  ;

  evt.target.style.backgroundColor = couples.arrCouples[couples.arrElementsCouple[evt.target.style.order]].color;
  if (!evt.target.classList.contains('box_fix')) {
    evt.target.classList.add('box_opened');
    setTimeout(checkBoxes, 700);
  }
};

const addBox = (backgroundColor, order) => {
  const boxElement = boxTemplate.cloneNode(true);
  const box = boxElement.querySelector('.box');
  box.style.order = order;

  box.addEventListener('click', openBox);

  boxes.append(boxElement);
};

const checkBoxes = () => {
  const openedBoxes = Array.from(boxes.querySelectorAll('.box_opened'));
  if (openedBoxes.length === 2) {
    const indexCoupleOfFirstBox = couples.arrElementsCouple[openedBoxes[0].style.order];
    const indexCoupleOfSecondBox = couples.arrElementsCouple[openedBoxes[1].style.order];

    if (indexCoupleOfFirstBox === indexCoupleOfSecondBox) {
      openedBoxes.forEach((box) => {
        box.classList.remove('box_opened');
        box.classList.add('box_fix');
      });
    } else {
      openedBoxes.forEach((box) => {
        box.classList.remove('box_opened');
        box.style.backgroundColor = 'black';
      });
    }
  }
};

const clearBoxes = () => {
  couples.arrCouples = [];
  couples.arrElementsCouple = [];

  const addedBoxes = Array.from(boxes.querySelectorAll('.box'));

  addedBoxes.forEach((box) => {
    box.remove();
  })
}

const createBoxes = (evt) => {
  evt.preventDefault();

  clearBoxes();

  let gridTemplate = '';
  for(let i = 0; i < settingsHeight.value; i++) {
    gridTemplate += '1fr ';
  }
  gridTemplate += '/';
  for(let i = 0; i < settingsWidth.value; i++) {
    gridTemplate += '1fr ';
  }
  boxes.style.gridTemplate = gridTemplate;

  couples.arrCouples = generateCouples(settingsWidth.value, settingsHeight.value);
  couples.arrElementsCouple = getElementsCouple(couples.arrCouples);

  couples.arrCouples.forEach((couple) => {
    addBox(couple.color, couple.firstIndex);
    addBox(couple.color, couple.secondIndex);
  });
}

settings.addEventListener('submit', createBoxes);


