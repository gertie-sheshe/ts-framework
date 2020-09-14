import { BaseClass } from './BaseClass';
import { Attributes } from './Attributes';
import { ApiSync } from './ApiSync';
import { Events } from './Events';

const URL = `http://localhost:3000/users`;

export interface UserProps {
  id?: number;
  name: string;
  age: number;
}

export class User extends BaseClass<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Events(),
      new ApiSync<UserProps>(URL)
    );
  }
}
