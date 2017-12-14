import { db } from '../models';
import {UsersSeeder} from './Users.seed';
import {ProductsSeeder} from './product-seed/Product.seed';
import {AttributeSeeder} from './product-seed/Attribute.seed';
import {AttributeValueSeeder} from './product-seed/AttributeValue.seed';
import {ProductTypeSeeder} from './product-seed/ProductType.seed';
import {ProductTypeAttributeValuesSeeder} from './product-seed/ProductTypeAttributeValues.seed';
import {ProductAttributeValuesSeeder} from './product-seed/ProductAttributeValues.seed';
import {ProductSKUSeeder} from './product-seed/ProductSKU.seed';

db.sequelize
  .sync({ force: true })
  .then(UsersSeeder)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(ProductTypeSeeder)
  .then(productTypes => console.log(`Seeded ${productTypes.length} product types OK`))
  .then(AttributeSeeder)
  .then(attributes => console.log(`Seeded ${attributes.length} attributes OK`))
  .then(AttributeValueSeeder)
  .then(attributeValues => console.log(`Seeded ${attributeValues.length} attribute values OK`))
  .then(ProductTypeAttributeValuesSeeder)
  .then(result => console.log(`Seeded ${result.length} "ProductType" and "AttributeValues" association table OK`))
  .then(ProductsSeeder)
  .then(products => console.log(`Seeded ${products.length} products OK`))
  .then(ProductSKUSeeder)
  .then(result => console.log(`Seeded ${result.length} product sku OK`))
  .then(ProductAttributeValuesSeeder)
  .then(result => console.log(`Seeded ${result.length} "Product" and "AttributeValues" association table OK`))
  // .then(seedProduct_meta)
  // .then(product_meta =>
  //     console.log(`Seeded ${product_meta.length} meta seeded ok`)
  // )
  .catch(error => console.error(error))
  .finally(() => db.sequelize.close());
