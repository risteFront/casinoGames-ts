import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity("posts")
export class Posts extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text", { nullable: false })
  name: string;

  @Field()
  @Column("text", { nullable: true })
  header: string;

  @Field()
  @Column("text", { nullable: true })
  body: string;

  @Field()
  @Column("text", { nullable: false })
  email: string;
}
