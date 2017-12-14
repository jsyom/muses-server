import {Attribute} from '../models/product-models/Attribute';
import {Model} from 'sequelize-typescript';
import * as Bluebird from 'bluebird';

export const AttributeController = {
  fetchAllAttributes(): Bluebird<Model<Attribute>[]> {
    return Attribute.findAll()
  }
};
