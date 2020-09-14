import { User, UserProps } from './models/User';
import { Collection } from './models/Collection';

const collection = new Collection<User, UserProps>(
  'http://localhost:3000/users',
  (json: UserProps) => User.buildUser(json)
);

collection.fetch();

collection.on('change', () => {
  console.log('WAUUUUU', collection);
});

// const user = User.buildUser({ name: 'GeeGee', age: 78 });

// user.save();

// user.on('save', () => {
//   console.log('Saaaaaave', user.get('id'));
// });

// // user.save();

// user.save().then(() => {
//   // user.fetch();
//   console.log('Saaaaaave', user.get('id'));
// });

// user.set({ age: 2 });

// user.on('click', () => console.log('Click!!!'));
// user.on('click', () => console.log('Click!!! Twicce'));
// user.on('change', () => console.log('We change'));
// user.on('hover', () => console.log('Hover me up'));

// user.trigger('click');

// console.log(user.get('name'));
// console.log(user.get('age'));
