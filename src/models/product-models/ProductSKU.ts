/*
 * https://github.com/RobinBuschmann/sequelize-typescript#table
 */
import {
  Table, Column, Model, DataType,
  /* association decorators */
  BelongsToMany, BelongsTo, ForeignKey,
  /* timestamps decorators */
  CreatedAt, UpdatedAt, HasOne, DefaultScope, Scopes
} from 'sequelize-typescript';
// import {ProductAttributeValues} from './ProductAttributeValues';
import {AttributeValue} from './AttributeValue';
import {Product} from './Product';

/*
 * ----------
 * ProductSKU
 * ----------
 * This model will store data for price and stock information
 * currently only using price
 */
@DefaultScope({
  // include: [() => AttributeValue]
})
@Scopes({
  withAttributeValue: {
    include: [() => AttributeValue]
  }
})
@Table({
  timestamps: true
})
export class ProductSKU extends Model<ProductSKU> {

  /* Core data */
  @Column(DataType.STRING)
  sku: string;

  @Column(DataType.FLOAT)
  price: string;

  @Column(DataType.BOOLEAN)
  isActive: boolean;

  /*
   * Inventory data
   * --------------
   * future proof to build our product module to work even with inventory.
   * for now we will set quantity = 0, trackStock = false
   */
  @Column(DataType.INTEGER)
  quantity: number;

  @Column(DataType.BOOLEAN)
  trackStock: boolean;

  /* Timestamps */
  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;


  /* one to many */
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  /* one to many */
  @ForeignKey(() => AttributeValue)
  @Column
  attributeValueId: number;

  @BelongsTo(() => AttributeValue)
  attributeValue: AttributeValue;
  //
  // /* many to many */
  // @BelongsTo(() => ProductSKUAttributeValues)
  // attributeValues: AttributeValue[];
  //
  // @HasOne(() => ProductSKU)
  // productSKUs: ProductSKU[];
}
