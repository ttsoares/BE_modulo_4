import { BaseEntity, Column, PrimaryGeneratedColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";

import { Message } from "./Messages";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    uid?: number;

  @Column()
    name: string;

  @Column()
    password: string;

  @OneToMany(() => Message, message => message.user)
    message?: Message[];

  constructor( name: string, password: string ) {
    super();
    this.name = name;
    this.password = password;
  }
}
