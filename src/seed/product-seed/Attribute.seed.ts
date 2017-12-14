import { db } from '../../models';
import {Attribute} from '../../models/product-models/Attribute';

export const AttributeSeeder = () => db.sequelize.Promise.map([
  {
    name: 'Default',
    description: 'default attribute'
  },
  {
    name: 'Color',
    description: 'color attribute'
  },
  {
    name: 'Size',
    description: 'size attribute'
  },
  {
    name: 'Flavor',
    description: 'flavor attribute'
  }
], attribute => Attribute.create(attribute));
