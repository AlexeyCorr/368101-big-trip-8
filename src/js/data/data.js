const CARDS = 7;
const MAX_COST = 250;
const MIN_COST = 20;
const MAX_OFFERS = 2;
const MAX_PHOTOS = 5;
const MAX_SENTENCES = 3;
const START_DATE = new Date(2019, 1, 1);
const END_DATE = new Date(2020, 1, 1);
const TYPE = {
  'Taxi': `🚕`,
  'Bus': `🚌`,
  'Train': `🚂`,
  'Ship': `🛳️`,
  'Transport': `🚊`,
  'Drive': `🚗`,
  'Flight': `✈️`,
  'Sightseeing': `🏛️`,
  'Check-in': `🏨`,
  'Restaurant': `🍴`,
};
const OFFERS = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`];
const SENTENCES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
const CITIES = [`Amsterdam`, `Geneva`, `Tokyo`, `London`, `Berlin`, `Barselona`, `Paris`, `Busan`];

const getRandomInt = (max = 1, min = 0) => Math.floor(Math.random() * (max - min) + min);

const getRandomPhotos = (count) => {
  const photos = [];
  for (let i = 0; i < count; i++) {
    photos.push(`http://picsum.photos/300/150?r=${Math.random()}`);
  }
  return photos;
};

const getNewArray = (array, count) => {
  const copyArray = [...array];
  const newArray = [];
  for (let i = 0; i < count; i++) {
    let indexRandomOfElement = getRandomInt(copyArray.length - 1, 0);
    newArray.push(copyArray[indexRandomOfElement]);
    copyArray.splice(indexRandomOfElement, 1);
  }
  return newArray;
};

export const createData = () => {
  const keysOfType = Object.keys(TYPE);
  const typeName = keysOfType[getRandomInt(keysOfType.length)]

  return {
    title: typeName,
    type: TYPE[typeName],
    city: CITIES[getRandomInt(CITIES.length)],
    photos: getRandomPhotos(getRandomInt(MAX_PHOTOS)),
    offers: getNewArray(OFFERS, MAX_OFFERS),
    price: getRandomInt(MAX_COST, MIN_COST),
    description: getNewArray(SENTENCES, getRandomInt(MAX_SENTENCES, 1)),
    date: {
      day: START_DATE.getDay(),
      month: START_DATE.getMonth()
    },
    time: {
      from: `${START_DATE.getHours()}:${START_DATE.getMinutes()}`,
      to: `${END_DATE.getHours() + 2}:${END_DATE.getMinutes() + 2}`,
    }
  }
};

const getArrayDate = () => {
  const date = [];
  const cardsAmount = getRandomInt(CARDS, 1);
  for (let i = 0; i <= cardsAmount; i++) {
    date.push(createData());
  }
  return date;
}

const filtersData = [
  {
    type: `everything`,
    checked: true
  },
  {
    type: `future`
  },
  {
    type: `past`
  }
];

const cardsData = getArrayDate();

export {filtersData, cardsData};
