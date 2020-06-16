const { DataSource } = require('apollo-datasource');

const USERS = [
  {
    id: '1',
    email: 'sopl.wang@gmail.com',
    profileImage: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    id: '3',
    email: 'louis@louis.ly',
    profileImage: 'https://i.imgur.com/SsJmZ9jl.jpg',
  },
  {
    id: '33',
    email: 'mars.kao@gmail.com',
    profileImage: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  }
];

const BOOKINGS = [
  {
    id: '1',
    from: 'Mars Kao',
    to: 'Jack Massey Weish',
    message: 'Idc what you say to yourself. You just bought a  Tesla so I figured you needed the money. Do whatever if you want you can just like share a wall for 5 seconds and that\'ll suffice. Merry Christmas.',
    talent: '1',
    by: '33',
    due: 4,
    price: 10,
  },
  {
    id: '2',
    from: 'Wang Wenlin',
    to: 'Kavin',
    message: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.',
    talent: '1',
    by: '1',
    due: 3,
    price: 50,
  },
  {
    id: '3',
    from: 'Mars Kao',
    to: 'Rao Jun Hua',
    message: '祝 Jun Hua 生日快乐，新的旅程一番风顺。',
    talent: '1',
    by: '33',
    due: 4,
    price: 200,
  },
  {
    id: '4',
    from: 'Wang Wenlin',
    to: 'Xue biao',
    message: 'Happy new year! Why so short?',
    talent: '1',
    by: '1',
    due: 1,
    price: 1000,
  },
  {
    id: '5',
    from: 'Louis Yang',
    to: 'Zhang Ti',
    message: 'I belief our product can gain large success. We must work hard and harder.',
    talent: '1',
    by: '3',
    due: 10,
    price: 40,
  },
];

class BookingAPI extends DataSource {
  constructor() {
    super();
  }

  /** @param {{ talent: string }} */
  async findBookingsByTalent({ talent }) {
    return BOOKINGS.filter(it => it.talent === talent);
  }

  /** @param {{ uid: string }} */
  async findOrCreateUser({ uid } = {}) {
    return USERS.find(it => it.id === uid);
  }
}

module.exports = BookingAPI;
