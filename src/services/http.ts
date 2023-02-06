import axios from 'axios';

export default class HttpService {
  public static getHeader(): any {
    console.log('Some types of header');
    return {
      Authorization: 'Bearer' + window.localStorage.getItem('token'),
    };
  }

  public static get(url: string) {
    const xhr = axios({
      method: 'GET',
      url: `/api/${url}`,
      headers: HttpService.getHeader(),
    }).then(res => res.data());
    return xhr;
  }

  public static post(url: string, data: any) {
    const xhr = axios({
      method: 'POST',
      url: `/api/${url}`,
      headers: HttpService.getHeader(),
      data,
    }).then(res => res.data());
    return xhr;
  }
}
