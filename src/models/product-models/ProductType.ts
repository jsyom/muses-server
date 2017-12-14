import {
  Table, Column, Model, DataType, HasMany, PrimaryKey, AutoIncrement,
  /* timestamps decorators */
  CreatedAt, UpdatedAt, ForeignKey, BelongsTo
} from 'sequelize-typescript';
import {Product} from './Product';
import {Attribute} from './Attribute';
import {ProductTypeAttributeValues} from './ProductTypeAttributeValues';

@Table
export class ProductType extends Model<ProductType> {

  // @AutoIncrement
  // @PrimaryKey
  // @Column
  // id: string;
  //
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  description: string;

  @ForeignKey(() => ProductType)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  parentId: ProductType;

  @Column(DataType.INTEGER)
  order: number;

  @HasMany(() => Product, 'productTypeId')
  products: Product[];

  @BelongsTo(() => ProductType, 'id')
  productType: ProductType | null;

  @HasMany(() => ProductTypeAttributeValues, 'productTypeId')
  productTypeAttributeValues: ProductTypeAttributeValues[];
}
