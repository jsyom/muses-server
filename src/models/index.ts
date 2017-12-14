/*
 * https://github.com/RobinBuschmann/sequelize-typescript
 */
import {Sequelize, ISequelizeConfig} from 'sequelize-typescript';
import {User} from './User';
import {
  Product,
  ProductAttributeValues,
  Attribute,
  AttributeValue,
  ProductType,
  ProductTypeAttributeValues,
  ProductSKU
} from './product-models';

/*
 * Set Sequelize Configuration
 * -----------------------
 * type: ISequelizeConfig
 * ./node_modules/sequelize-typescript/lib/interfaces/ISequelizeConfig.d.ts
 *
 * requirement
 */
const env = process.env.NODE_ENV || 'development';
const envFile = require('dotenv').config().parsed;

if (!envFile) {
  /*
   * For security reason, we want to keep our credentials to hidden file.
   * .env works perfect for this case, but in order for us to avoid making any commit
   * including any of those sensitive credentials and third party api key,
   * we will copy .env.sample file to create .env file for each developer's environment
   */
  throw new Error(
    'To connect with database, you need to create .env file under root.\n ' +
    'Please save ".env.sample" file as ".env" file and fill out information'
  );
}

const config: ISequelizeConfig = {
  username: env === 'productions' ? envFile.PROD_DB_USERNAME : envFile.DEV_DB_USERNAME,
  password: env === 'productions' ? envFile.PROD_DB_PASSWORD : envFile.DEV_DB_PASSWORD,
  database: env === 'productions' ? envFile.PROD_DB_NAME : envFile.DEV_DB_NAME,
  host: env === 'productions' ? envFile.PROD_DB_HOST : envFile.DEV_DB_HOST,
  port: envFile.DB_PORT,
  dialect: envFile.DB_DIALECT,
  logging: false,
};

const sequelize: Sequelize = new Sequelize(config);

export const db = {
  sequelize: sequelize,
  models: sequelize.addModels([
    User,
    Product,
    ProductSKU,
    ProductType,
    ProductTypeAttributeValues,
    // Category,
    Attribute,
    AttributeValue,
    ProductAttributeValues
  ])
};

export async function syncDatabase(options: any): Promise<void> {
  return db.sequelize.sync(options)
}
