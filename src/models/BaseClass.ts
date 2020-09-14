import { AxiosPromise, AxiosResponse } from 'axios';
import { Callback } from './Events';

interface Attributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class BaseClass<T extends HasId> {
  constructor(
    private attributes: Attributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(value: T): void {
    this.attributes.set(value);
    this.events.trigger('change');
  }

  async fetch(): Promise<void> {
    const id = this.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    const response: AxiosResponse = await this.sync.fetch(id);
    this.set(response.data);
  }

  async save(): Promise<void> {
    const response: AxiosResponse = await this.sync.save(
      this.attributes.getAll()
    );
    this.set(response.data);
    this.trigger('save');
  }
}
