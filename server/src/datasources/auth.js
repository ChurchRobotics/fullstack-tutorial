const { DataSource } = require('apollo-datasource');
const { generateVerificationCode, getDateTime } = require('../utils');
const { initiateSMSService } = require('../lib/aliyun/SMSService');

const VERIFICATION_CODES = [
  {
    id: 'id0.48142019042068274',
    phoneNumber: '15170678888',
    verificationCode: '2461',
    expirationTime: new Date('2020-09-07T04:20:49.163Z')
  },
  {
    id: 'id0.4814201111168274',
    phoneNumber: '15170676666',
    verificationCode: '2461',
    expirationTime: new Date('2020-09-04T10:50:49.163Z')
  }
]

const USER = [
  {
    id: '1',
    email: 'sopl.wang@gmail.com',
    profileImage: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    phoneNumber: '15170678888'
  },
  {
    id: '3',
    email: 'louis@louis.ly',
    profileImage: 'https://i.imgur.com/SsJmZ9jl.jpg',
    phoneNumber: '15170672222'
  },
]

class AuthAPI extends DataSource {
  constructor() {
    super();
  }

  sendVerificationCode(phoneNumber) {
    const verificationCode = generateVerificationCode();
    initiateSMSService(phoneNumber, '拍鸭App', 'SMS_201680285',
      `{"code": ${verificationCode}}`)
      .then(({ Code = '' }) => {
        if (Code === 'OK')
          VERIFICATION_CODES.push({
            id: 'id' + Math.random(), phoneNumber, verificationCode, expirationTime: getDateTime(new Date())
          })
      }).catch(({ data: { Message } }) => {
      console.log(Message);
    })
  }

  async login(phoneNumber, verificationCode) {
    const currentDate = new Date();
    if (!this.checkVerificationCodeTimeliness(phoneNumber, verificationCode, currentDate))
      return { success: true, message: '验证码已失效' }
    if (!this.checkExistenceUser(phoneNumber)) this.saveUser();
    this.updateExpirationTime(phoneNumber, currentDate);
    return { success: true, message: '登录成功!', authorization: new Buffer(phoneNumber).toString('base64') };
  }

  checkVerificationCodeTimeliness(phoneNumber, verificationCode, currentDate) {
    const items = VERIFICATION_CODES.filter(item => item.phoneNumber === phoneNumber);
    if (new Date(items[0].expirationTime) < currentDate) return false;
    return items && items[0].verificationCode === verificationCode;
  }

  checkExistenceUser(phoneNumber) {
    return USER.findIndex(item => item.phoneNumber === phoneNumber) !== -1;
  }

  saveUser() {
    USER.push({ id: 'id' + Math.random(), email: "1231312", profileImage: "profileImage", phoneNumber: "213423424" });
  }

  updateExpirationTime(phoneNumber, currentDate) {
    //要修改验证码的失效时间，将失效时间改为当前时间
    const userVerificationCode = VERIFICATION_CODES.find(item => item.phoneNumber === phoneNumber && item.expirationTime >= currentDate);
    userVerificationCode.expirationTime = currentDate
    VERIFICATION_CODES.splice(0, 1, userVerificationCode);
  }
}

module.exports = AuthAPI;
