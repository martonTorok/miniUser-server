import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  DataType
} from "sequelize-typescript";

@Table({ tableName: "Admins" })
export default class Admin extends Model<Admin> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  adminName: string;

  @Column
  adminPassword: string;
}
