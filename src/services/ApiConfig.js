export default class ApiConfig {
  status = 'status';

  message = 'message';

  data = 'data';

  constructor(baseUrl, config) {
    this.baseUrl = baseUrl;
    if (config?.status) this.status = config.status;
    if (config?.message) this.message = config.message;
    if (config?.data) this.data = config.data;
  }
}
