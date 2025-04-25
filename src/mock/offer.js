const offersModel = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Choose the radio station',
        price: 60
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Express',
        price: 30
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Coupe',
        price: 80
      },
      {
        id: 2,
        title: 'Sleeping car',
        price: 130
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'busness',
        price: 260
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'econom',
        price: 70
      },
      {
        id: 2,
        title: 'busness',
        price: 140
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'busness',
        price: 100
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: '',
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: '',
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'michelin',
        price: 350
      },
      {
        id: 2,
        title: 'cafe',
        price: 50
      },
      {
        id: 3,
        title: 'restaurant',
        price: 75
      }
    ]
  }
];

const pointTypeOffer = (point) => offersModel.find((offer) => offer.type === point.type);

export {pointTypeOffer, offersModel};
