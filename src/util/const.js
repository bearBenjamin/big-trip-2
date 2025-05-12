const POINT_COUNT = 5;

const TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const  DESTINATION = [
  {
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        'src': 'https://loremflickr.com/300/200?r=0.0762563005163317',
        'description': 'Chamonix parliament building'
      }
    ]
  },
  {
    description: 'Geneva, is a beautiful city, a capital Swistzerland.',
    name: 'Geneva',
    pictures: [
      {
        'src': 'https://loremflickr.com/300/200?r=0.0762563005163317',
        'description': 'Geneva parliament building'
      }
    ]
  },
  {
    description: 'Amsterdam, is a beautiful city, a capital Holand.',
    name: 'Amsterdam',
    pictures: [
      {
        'src': 'https://loremflickr.com/300/200?r=0.0762563005163317',
        'description': 'Amsterdam parliament building'
      }
    ]
  }
];

const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  FUTURE: 'future',
};

const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};


export { POINT_COUNT, TYPE, DESTINATION, FilterType, SortType };
