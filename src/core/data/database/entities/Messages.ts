import { BaseEntity, Column, PrimaryGeneratedColumn, Entity, OneToOne, PrimaryColumn } from "typeorm";

import { User } from "./Users"

@Entity({ name: "messages" })
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
    uid?: number;

  @Column()
    description: string;

  @Column()
    details: string;

  @Column()
    user_id: number;

  @OneToOne(() => User, user => user.message)
  user?: User;

  constructor( description: string, details: string, user_id: number ) {
    super();
    this.description = description;
    this.details = details;
    this.user_id = user_id;
  }
}
