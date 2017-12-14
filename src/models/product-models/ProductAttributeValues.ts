import {Table, Column, Model, ForeignKey} from 'sequelize-typescript';
import { Product } from './Product';
import {AttributeValue} from './AttributeValue';

@Table
export class ProductAttributeValues extends Model<ProductAttributeValues> {

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @ForeignKey(() => AttributeValue)
  @Column
  attributeValueId: number;

}
