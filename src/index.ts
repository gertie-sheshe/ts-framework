import { User } from './models/User';

const user = new User({ name: 'GeeGee', age: 78 });

user.save().then(() => {
  user.fetch();
});

// user.set({ age: 2 });

// user.on('click', () => console.log('Click!!!'));
// user.on('click', () => console.log('Click!!! Twicce'));
// user.on('change', () => console.log('We change'));
// user.on('hover', () => console.log('Hover me up'));

// user.trigger('click');

// console.log(user.get('name'));
// console.log(user.get('age'));
