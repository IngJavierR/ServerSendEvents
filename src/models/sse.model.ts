import {Table, Column, Model, HasMany, PrimaryKey} from 'sequelize-typescript';

export interface IUsers {
    id: number
    name: string
}

@Table({
    tableName: "Users"
})
export default class Users extends Model implements IUsers {

    @PrimaryKey
    @Column
    id!: number

    @Column
    name!: string
}