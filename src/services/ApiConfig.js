export default class ApiConfig {
  status = 'status';

  message = 'message';

  data = 'data';

  constructor(baseUrl, {status, message, data}) {
    this.baseUrl = baseUrl;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
