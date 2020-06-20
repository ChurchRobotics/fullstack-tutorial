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

const WALLETS = [
  {
    id: '1',
    of: '1',
    balance: 1500,
    totalIncome: 2500,
  }
];

const DRAWNS = [
  {
    id: '1',
    wallet: '1',
    amount: 300,
    to: 'ti@alipay.com',
    status: 'DONE',
    date: 133.05,
  },
  {
    id: '2',
    wallet: '1',
    amount: 700,
    to: 'ti@alipay.com',
    status: 'PROCESSING',
    date: 155.32,
  },
];

module.exports = {
  USERS,
  WALLETS,
  DRAWNS,
};
