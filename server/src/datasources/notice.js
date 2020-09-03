const { DataSource } = require('apollo-datasource');
const { JPushAsync } = require("jpush-async")

const client = JPushAsync.buildClient('a014f411544eaed8bfb569a1', 'bf75d2b6c66de18edb722bc3')

class NoticeAPI extends DataSource {
  constructor() {
    super();
  }

  updateAlias(userId, pushToken) {
    client.updateDeviceTagAlias(pushToken, userId, null, [], []);
  }

  async sendNotices({ userIds }) {
    return this.initiatePushService(['android'], [JPushAsync.alias(...userIds)],
      [JPushAsync.android('给android推送消息', '测试推送', 5, null, null,
        null, 3, 2, 2)]);
  }

  async initiatePushService(platform, audience, notification) {
    let generalResponse = {};
    await client.push()
      .setPlatform(...platform)
      .setAudience(...audience)
      .setNotification(...notification)
      .setOptions(null, 60)
      .send()
      .then(() => {
        generalResponse = { success: true, message: '成功推送!' }
      }).catch(() => {
        generalResponse = { success: false, message: '推送失败!' }
      })
    return generalResponse;
  }

  deletePlatformAlias(alias, platform) {
    client.deleteAlias(alias, platform);  //无论成功与否都是返回undefined,这里该这么断言是否删除成功
  }
}

module.exports = NoticeAPI;
