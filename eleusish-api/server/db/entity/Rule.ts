import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Rule {
  @PrimaryColumn()
  id: string

  @Column()
  code: string
}
