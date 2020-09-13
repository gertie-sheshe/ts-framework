import { Events } from './Events';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
import { AxiosResponse } from 'axios';

const URL = `http://localhost:3000/users`;

export interface UserProps {
  id?: number;
  name: string;
  age: number;
}

export class User {
  public events: Events = new Events();
  public sync: Sync<UserProps> = new Sync(URL);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
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
