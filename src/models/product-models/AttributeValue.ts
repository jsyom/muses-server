import {
  Table, Column, Model, IsUUID, PrimaryKey, BelongsTo, DataType, BelongsToMany, HasMany, ForeignKey, HasOne, Scopes,
  DefaultScope
} from 'sequelize-typescript';
import {Product} from './Product';
import {Attribute} from './Attribute';
import {ProductTypeAttributeValues} from './ProductTypeAttributeValues';
import {ProductType} from './ProductType';
import {ProductSKU} from './ProductSKU';
import {ProductAttributeValues} from './ProductAttributeValues';

@DefaultScope({
  include: [
    () => ProductSKU,
  ]
})
@Table
export class AttributeValue extends Model<AttributeValue> {

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  description: string;

  /*
   * AttributeValue Belongs To Attribute
   */
  @ForeignKey(() => Attribute)
  @Column
  attributeId: number;

  @BelongsTo(() => Attribute)
  attribute: Attribute;

  /*
   * AttributeValue HasOne ProductSKU
   */
  @HasOne(() => ProductSKU)
  productSKU: ProductSKU;

  /*
   * AttributeValue HasOne Product
   */
  @BelongsToMany(() => Product, () => ProductAttributeValues)
  products: Product[];

  /*
   * AttributeValue Belongs To Many ProductType
   */
  @BelongsToMany(() => ProductType, () => ProductTypeAttributeValues)
  productTypeAttributeValues: AttributeValue[];
}
