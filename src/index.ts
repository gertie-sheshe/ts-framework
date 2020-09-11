console.log('wauuu');

import { User } from './models/User';

const user = new User({ name: 'GeeGee', age: 78 });

user.set({ age: 2 });

console.log(user.get('name'));
console.log(user.get('age'));
