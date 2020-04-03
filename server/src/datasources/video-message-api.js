const { RESTDataSource } = require('apollo-datasource-rest');

class VideoMessageAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:8182/api/';
  }

  willSendRequest(req) {
    req.headers.set('authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NvcGUiOiJvcGVyIiwiaXNzIjoia2FtZW8ifQ.cOngvJnjdTWVRYGXWaFIp4TKCnszlNYQXUvDC-JykxI');
  }

  getVideoMessage({ messageId }) {
    return this.get(`video-message/all/${messageId}`);
  }

  draftVideoMessage({ draft }) {
    return this.post('video-message/drafts/', draft);
  }

  sendVideoMessage({ messageId }) {
    return this.post('video-message/outbox/', messageId);
  }
}

module.exports = VideoMessageAPI;
