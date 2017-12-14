/*
 * https://github.com/RobinBuschmann/sequelize-typescript#table
 */
import {
  Table, Column, Model, DataType,
  /* scopes decorators */
  DefaultScope,
  /* association decorators */
  BelongsTo, ForeignKey,
  /* timestamps decorators */
  CreatedAt, UpdatedAt, HasMany, BelongsToMany
} from 'sequelize-typescript';
import {ProductType} from './ProductType';
import {ProductSKU} from './ProductSKU';
import {AttributeValue} from './AttributeValue';
import {ProductAttributeValues} from './ProductAttributeValues';

@DefaultScope({
  include: [
    () => ProductType,
    // () => ProductSKU,
    () => AttributeValue,
  ]
})
@Table({
  timestamps: true
})
export class Product extends Model<Product> {



  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.BOOLEAN)
  isActive: boolean;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  /*
   * one(ProductType) to many(Product)
   * e.g) Food: Product BelongsTo ProductType
   */
  @ForeignKey(() => ProductType)
  @Column
  productTypeId: number;

  @BelongsTo(() => ProductType, 'productTypeId')
  productType: ProductType;

  /*
   * one(Product) to many(ProductSKU)
   * e.g) Food: Product has many ProductSKU
   */
  @HasMany(() => ProductSKU)
  productSKUs: ProductSKU[];

  /*
   * one(Product) to many(A)
   * e.g) Food: ProductType has many Room(
   */
  @BelongsToMany(() => AttributeValue, () => ProductAttributeValues)
  attributeValues: AttributeValue[];
}
