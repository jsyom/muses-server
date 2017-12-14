import {
  Table, Column, Model, IsUUID, PrimaryKey, DataType,
  /* hooks */
  BeforeUpdate, BeforeCreate
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
// const bcrypt = require('bcrypt');

@Table
export class User extends Model<User> {

  // @IsUUID(4)
  // @PrimaryKey
  // @Column
  // id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email: string;

  @Column({
    type: DataType.STRING
  })
  password: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  twitterId: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  twitterToken: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profileImg: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  username: string;

  // @Column
  // createdAt: Date;
  //
  // @Column(DataType.DATE)
  // updatedAt: Date;

  @BeforeUpdate
  @BeforeCreate
  static cryptEmailAndPassword(user: User): Promise<User> {
    user.email = user.email && user.email.toLowerCase();
    if (!user.password) {
      return Promise.resolve(user);
    }

    return cryptPassword(user.password)
      .then(hash => user.set('password', hash));
  }

  // Instance Method Doesn't seem to me
  // static generateHash(password, round): Promise<string> {
  //     return bcrypt.hash(password, round);
  // }
  //
  // static validPassword(password) {
  //     return bcrypt.compareSync(password, this.password);
  // }
}

export function cryptPassword(password) {
  console.log('cryptPassword' + password.toString());
  return Promise.resolve(bcrypt.genSalt(10)
    .then(salt => (bcrypt.hash(password.toString(), salt))));
}

export function validPassword(data, encrypted) {

  return bcrypt.compareSync(data.toString(), encrypted.toString())
}
