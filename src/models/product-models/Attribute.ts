import {
  Table, Column, Model, DataType, HasMany
} from 'sequelize-typescript';
import {AttributeValue} from './AttributeValue';

@Table
export class Attribute extends Model<Attribute> {

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  description: string;

  @HasMany(() => AttributeValue)
  attributeValues: AttributeValue[];
}
