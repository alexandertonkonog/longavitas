import { APIConstants } from "./index.constant";
import { TApiParams, TUrlParams } from "./index.types";

class API {
  public async get(urlParams?: TUrlParams): Promise<any> {
    const params: TApiParams = {
      method: 'GET',
      params: urlParams
    };
    return this.request(params);
  }

  public async post(data: any, urlParams?: TUrlParams): Promise<any> {
    const params: TApiParams = {
      method: 'POST',
      params: urlParams
    };
    return this.request(params, data);
  }

  private async request(params: TApiParams, data: any | undefined = undefined): Promise<any> {
    try {
      const url = APIConstants.API_URL + (params.params ? this.getParamsFromObject(params.params) : '');
      const response = await fetch(url, {
        method: params.method,
        body: JSON.stringify(data),
        // headers: {
        //   Authorization: "Basic " + btoa(APIConstants.API_LOGIN + ':' + APIConstants.API_PASSWORD),
        // }
      })
      const result = await response.json();
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  private getParamsFromObject(object: {[key: string]: string}): string {
    const objectParams = Object.entries(object).map(item => item.join('='));
    return '?' + objectParams.join('&');
  }
}

export default new API();