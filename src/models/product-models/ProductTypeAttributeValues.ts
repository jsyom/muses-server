import {Table, Column, Model, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {ProductType} from './ProductType';
import {AttributeValue} from './AttributeValue';

@Table
export class ProductTypeAttributeValues extends Model<ProductTypeAttributeValues> {

  @ForeignKey(() => ProductType)
  @Column
  productTypeId: number;

  @ForeignKey(() => AttributeValue)
  @Column
  attributeValueId: number;

  @BelongsTo(() => AttributeValue)
  attributeValue: AttributeValue;

  @BelongsTo(() => ProductType)
  productType: ProductType;
}
