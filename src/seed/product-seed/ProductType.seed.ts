import { db } from '../../models';
import {ProductType} from '../../models/product-models/ProductType';

export const ProductTypeSeeder = () => db.sequelize.Promise.map([
  {
    name: 'Food',
    description: 'Category for food menu',
    parentId: null,
    order: 1
  },
  {
    name: 'Drinks',
    description: 'Category for drinks menu',
    parentId: null,
    order: 2
  },
  {
    name: 'Packages',
    description: 'Category for grouped menu',
    parentId: null,
    order: 3
  },
  {
    name: 'Cocktail',
    description: 'Cocktail menu',
    parentId: 2,
    order: 1
  },
  {
    name: 'Beer',
    description: 'Beer menu',
    parentId: 2,
    order: 2
  },
  {
    name: 'Soju',
    description: 'Soju menu',
    parentId: 2,
    order: 3
  },
  {
    name: 'Appetizers',
    description: 'Appetizers menu',
    parentId: 1,
    order: 1
  },
  {
    name: 'Snacks',
    description: 'Finger foods',
    parentId: 1,
    order: 2
  },
  {
    name: 'Soft Drink',
    description: 'soft drinks menu',
    parentId: 2,
    order: 10
  },
  {
    name: 'Room',
    description: 'Rooms',
    parentId: null,
    order: 4
  },
  {
    name: 'Sprits',
    description: 'Whiskey menu',
    parentId: 2,
    order: 4
  },
  {
    name: 'Whiskey',
    description: 'Whiskey',
    parentId: 11,
    order: 1
  },
  {
    name: 'Single Malt',
    description: 'Single Malt',
    parentId: 11,
    order: 2
  }
], productType => ProductType.create(productType));
