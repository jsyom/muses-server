import { User } from '../models/User';
import { db } from '../models';
import * as bcrypt from 'bcrypt';

export const UsersSeeder = () => db.sequelize.Promise.map([
  {
    email: 'god@god.com',
    password: 'god',
    isAdmin: true
  },
  {
    email: 'john@john.com',
    password: 'john'
  },
  {
    email: 'milo@milo.com',
    password: 'milo',
    twitterId: '931948317155778562'
  },
  {
    email: 'dan@dan.com',
    password: 'dan'
  }
], user => User.create(user));
