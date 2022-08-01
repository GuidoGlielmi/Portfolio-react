import ApiConfig from './ApiConfig';
import RequestError from './RequestError';

class Fetch {
  #api;

  #methodsNames = ['GET', 'POST', 'PUT', 'DELETE'];

  constructor(apiConfig) {
    this.#api = apiConfig;
    this.#methodsNames.forEach(methodName => {
      // Fetch.prototype === this.__proto__
      Fetch.prototype[methodName.toLowerCase()] = async (url, body) =>
        this.#makeRequest(url, body, methodName);
    });
  }

  async #makeRequest(url, body, method) {
    let rawRes;
    try {
      rawRes = await fetch(`${this.#api.baseUrl}${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
        },
        ...(body && {body: JSON.stringify(body)}),
      });
    } catch {
      console.log('No internet');
      throw new RequestError({status: null, message: 'No hay internet'});
    }
    const res = await rawRes.json();
    if (res?.[this.#api.status] < 200 || res?.[this.#api.status] >= 300) {
      throw new RequestError({
        status: res?.[this.#api.status],
        message: res?.[this.#api.message],
      });
    }
    return res?.[this.#api.data];
  }
}
// const apiConfig = new ApiConfig('https://yoprogramo-server.herokuapp.com/');
const apiConfig = new ApiConfig('http://localhost:8080/');

export default new Fetch(apiConfig);
