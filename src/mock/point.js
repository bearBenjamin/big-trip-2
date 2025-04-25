import { getRandomInteger } from '../utils';
import { pointTypeOffer } from './offer';
import { DESTINATION } from '../const';
import dayjs from 'dayjs';

const maxDaysGap = 7;
const getBasePrice = () => Math.floor(Math.random() * (2000 - 20) + 20);

/*const offers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 1,
        'title': 'Choose the radio station',
        'price': 60
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': 1,
        'title': 'Express',
        'price': 30
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': 1,
        'title': 'Coupe',
        'price': 80
      },
      {
        'id': 2,
        'title': 'Sleeping car',
        'price': 130
      }
    ]
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 1,
        'title': 'busness',
        'price': 260
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': 1,
        'title': 'econom',
        'price': 70
      },
      {
        'id': 2,
        'title': 'busness',
        'price': 140
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': 1,
        'title': 'busness',
        'price': 100
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [null]
  },
  {
    'type': 'sightseeing',
    'offers': [null]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': 1,
        'title': 'michelin',
        price: 350
      },
      {
        'id': 2,
        'title': 'cafe',
        price: 50
      },
      {
        'id': 3,
        'title': 'restaurant',
        price: 75
      }
    ]
  }
]; */

const TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

// const destination = [
//   {
//     description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
//     name: 'Chamonix',
//     pictures: [
//       {
//         'src': 'https://loremflickr.com/300/200?r=0.0762563005163317',
//         'description': 'Chamonix parliament building'
//       }
//     ]
//   },
//   {
//     description: 'Geneva, is a beautiful city, a capital Swistzerland.',
//     name: 'Geneva',
//     pictures: [
//       {
//         'src': 'https://loremflickr.com/300/200?r=0.0762563005163317',
//         'description': 'Geneva parliament building'
//       }
//     ]
//   },
//   {
//     description: 'Amsterdam, is a beautiful city, a capital Holand.',
//     name: 'Amsterdam',
//     pictures: [
//       {
//         'src': 'https://loremflickr.com/300/200?r=0.0762563005163317',
//         'description': 'Amsterdam parliament building'
//       }
//     ]
//   }
// ];

const getDestination = () => DESTINATION[getRandomInteger(0, DESTINATION.length -1)].name;

const generateStartDate = () => {
  const daysGapStart = getRandomInteger(-maxDaysGap, 0);
  const startDay = dayjs().add(daysGapStart, 'day');
  const dateTimeStart = startDay.format();
  return dateTimeStart;
};

const generateEndDate = () => {
  const daysGapEnd = getRandomInteger(0, maxDaysGap);
  const endDay = dayjs().add(daysGapEnd, 'day');
  const dateTimeEnd = endDay.format();
  return dateTimeEnd;
};

function generatePoint () {
  const point = {
    basePrice: getBasePrice(),
    date: generateStartDate(),
    dateFrom: generateStartDate(),
    dateTo: generateEndDate(),
    destination: getDestination(),
    id: '0',
    isFavorite: `${getRandomInteger() === 1}`,
    offers: [],
    type: TYPE[getRandomInteger(0, TYPE.length - 1)]
  };

  const offers = pointTypeOffer(point);

  point.offers = [Number(getRandomInteger(1, offers.offers.length)), Number(getRandomInteger(1, offers.offers.length))];

  return point;
}

export { generatePoint };

