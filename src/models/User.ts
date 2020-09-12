import { Events } from './Events';
import { Sync } from './Sync';
import { Attributes } from './Attributes';

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
}
