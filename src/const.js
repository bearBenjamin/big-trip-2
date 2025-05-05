const POINT_COUNT = 7;

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
  EVERYTHING: 'evetything',
  PAST: 'past',
  FUTURE: 'future',
};


export { POINT_COUNT, DESTINATION, FilterType };
