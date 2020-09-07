const SMSClient = require('@alicloud/sms-sdk');

const accessKeyId = 'LTAI4GE6BpDMzgtrNRhsmH9W';
const secretAccessKey = '08HBLpUXXLFJT5APRN4HQ3WtrMBLN0';
let smsClient = new SMSClient({ accessKeyId, secretAccessKey })

function initiateSMSService(phoneNumber, signName, templateCode, templateParam) {
  return smsClient.sendSMS({
    PhoneNumbers: phoneNumber,
    SignName: signName,
    TemplateCode: templateCode,
    TemplateParam: templateParam
  })
}

module.exports = {
  initiateSMSService
}
