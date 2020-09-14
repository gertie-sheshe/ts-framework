import { BaseClass } from './BaseClass';
import { Attributes } from './Attributes';
import { ApiSync } from './ApiSync';
import { Events } from './Events';
import { Collection } from './Collection';

const URL = `http://localhost:3000/users`;

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User extends BaseClass<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Events(),
      new ApiSync<UserProps>(URL)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(URL, (json: UserProps) =>
      User.buildUser(json)
    );
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
