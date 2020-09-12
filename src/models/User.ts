import axios, { AxiosResponse } from 'axios';
import { Events } from './Events';

const URL = `http://localhost:3000`;

interface UserProps {
  id?: number;
  name: string;
  age: number;
}

export class User {
  public events: Events = new Events();

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: Partial<UserProps>): void {
    Object.assign(this.data, update);
  }

  async fetch(): Promise<void> {
    const response: AxiosResponse = await axios.get(
      `${URL}/users/${this.get('id')}`
    );

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
