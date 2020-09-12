import { Events } from './Events';
import { Sync } from './Sync';

const URL = `http://localhost:3000/users`;

export interface UserProps {
  id?: number;
  name: string;
  age: number;
}

export class User {
  public events: Events = new Events();
  public sync: Sync<UserProps> = new Sync(URL);

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: Partial<UserProps>): void {
    Object.assign(this.data, update);
  }
}
