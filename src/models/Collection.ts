import axios, { AxiosResponse } from 'axios';
import { Events } from './Events';

export class Collection<T, K> {
  models: T[] = [];
  events: Events = new Events();

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  async fetch(): Promise<void> {
    const response: AxiosResponse = await axios.get(this.rootUrl);

    response.data.forEach((value: K) => {
      this.models.push(this.deserialize(value));
    });

    this.trigger('change');
  }
}
