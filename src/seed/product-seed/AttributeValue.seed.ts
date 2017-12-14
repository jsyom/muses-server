import { db } from '../../models';
import {Attribute} from '../../models/product-models/Attribute';
import {AttributeValue} from '../../models/product-models/AttributeValue';

export const AttributeValueSeeder = () => db.sequelize.Promise.map([
  {
    attributeId: 1,
    name: null,
    description: null
  },
  {
    attributeId: 2,
    name: 'Black',
    description: 'black color'
  },
  {
    attributeId: 2,
    name: 'Blue',
    description: 'blue color'
  },
  {
    attributeId: 2,
    name: 'Red',
    description: 'red color'
  },
  {
    attributeId: 3,
    name: 'Pint',
    description: 'pint size'
  },
  {
    attributeId: 3,
    name: 'Shot',
    description: 'shot'
  },
  {
    attributeId: 3,
    name: 'Glass',
    description: 'glass'
  },
  {
    attributeId: 3,
    name: 'Bottle',
    description: 'bottle'
  },
  {
    attributeId: 3,
    name: 'Pitcher',
    description: 'pitcher size'
  },
  {
    attributeId: 4,
    name: 'Lychee',
    description: 'lychee flavor'
  },
  {
    attributeId: 4,
    name: 'Yogurt',
    description: 'yogurt flavor'
  },
  {
    attributeId: 4,
    name: 'Mango',
    description: 'mango flavor'
  },
  {
    attributeId: 3,
    name: 'Carafe',
    description: 'Carafe size'
  }

], value => AttributeValue.create(value));
