import {Product} from '../models/product-models/Product';
import {Model} from 'sequelize-typescript';
import * as Bluebird from 'bluebird';

export const ProductController = {
  fetchAllProducts(): Bluebird<Model<Product>[]> {
    return Product.findAll()
  }
};
