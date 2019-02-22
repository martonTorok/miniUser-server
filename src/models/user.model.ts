import {
  Table,
  Column,
  Model,
  IsEmail,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  DataType
} from "sequelize-typescript";

@Table({ tableName: "Users" })
export default class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id: number;

  @IsEmail
  @Column(DataType.STRING)
  UserEmail: string;

  @Column(DataType.STRING)
  UserName: string;
}
