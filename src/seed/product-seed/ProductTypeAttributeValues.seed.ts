import { db } from '../../models';
import {ProductTypeAttributeValues} from '../../models/product-models/ProductTypeAttributeValues';

export const ProductTypeAttributeValuesSeeder = () => db.sequelize.Promise.map([
  {
    productTypeId: 5, // Beer
    attributeValueId: 5 // Pint
  },
  {
    productTypeId: 5,
    attributeValueId: 8 // Bottle
  },
  {
    productTypeId: 5,
    attributeValueId: 9 // Pitcher
  },
  {
    productTypeId: 5,
    attributeValueId: 10 // Pitcher
  },
  {
    productTypeId: 6, // Soju
    attributeValueId: 13 // Carafe
  },
  {
    productTypeId: 6, // Soju
    attributeValueId: 8 // Bottle
  },
  {
    productTypeId: 6, // Soju
    attributeValueId: 9 // Pitcher
  },
  {
    productTypeId: 12, // Whiskey
    attributeValueId: 6 // Shot
  },
  {
    productTypeId: 12, // Whiskey
    attributeValueId: 7 // Glass
  },
  {
    productTypeId: 13, // Single Malt
    attributeValueId: 6 // Shot
  },
  {
    productTypeId: 13, // Single Malt
    attributeValueId: 7 // Glass
  },
], category => ProductTypeAttributeValues.create(category));
