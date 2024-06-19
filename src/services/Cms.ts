import {
  Cursor,
  InitConfig,
  OriginsVideoCard,
  OriginsVideoSection,
} from '@origins-digital/types/ott';
import { AxiosRequestConfig } from 'axios';

import Client from './Client';

import { ACCOUNT_KEY } from '$utils/constants';

export interface SearchPage {
  items: OriginsVideoCard[];
  cursor: Cursor;
}

class Cms {
  public client: Client;

  constructor(baseUrl: string, xAccountKey: string) {
    this.client = new Client(baseUrl, xAccountKey);
  }

  getConfig<T = InitConfig>(queries?: Record<string, number | string | string[]>): Promise<T> {
    return this.client.find('/ott/kentico/config', { params: queries });
  }

  getPageContent<T>(codename: string, config: AxiosRequestConfig): Promise<T> {
    return this.client.find(`/ott/kentico/pages/${codename}`, config);
  }

  getVideo(
    id: string,
    queries?: Record<string, number | string | string[]>,
  ): Promise<OriginsVideoSection> {
    return this.client.find(`/ott/kentico/videos/${id}`, { params: queries });
  }
}

export default new Cms('https://dev-cms-service.onrewind.tv', ACCOUNT_KEY);
