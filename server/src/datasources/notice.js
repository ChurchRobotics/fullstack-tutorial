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
    this.initiatePushService(['android'], [JPushAsync.alias(...userIds)],
      [JPushAsync.android('给android推送消息', '测试推送', 5, null, null,
        null, 3, 2, 2)]);
    return { success: true, message: '推送成功' }
  }

  initiatePushService(platform, audience, notification) {
    client.push()
      .setPlatform(...platform)
      .setAudience(...audience)
      .setNotification(...notification)
      .setOptions(null, 60)
      .send()
  }

  deletePlatformAlias(alias, platform) {
    client.deleteAlias(alias, platform);
  }
}

module.exports = NoticeAPI;
