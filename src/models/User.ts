import axios, { AxiosResponse } from 'axios';

const URL = `http://localhost:3000`;
interface UserProps {
  id?: number;
  name: string;
  age: number;
}

type Callback = () => void;

export class User {
  events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: Partial<UserProps>): void {
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);

    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((callback) => {
      callback();
    });
  }

  async fetch(): Promise<void> {
    console.log(this.get('id'), 'HMMM');
    const response: AxiosResponse = await axios.get(
      `${URL}/users/${this.get('id')}`
    );

    console.log('DATA', response);

    this.set(response.data);
  }

  async save(): Promise<void> {
    const id = this.get('id');

    if (id) {
      const response = await axios.put(`${URL}/users/${id}`, this.data);
      this.set(response.data);
    } else {
      const response = await axios.post(`${URL}/users`, this.data);
      this.set(response.data);
    }
  }
}
