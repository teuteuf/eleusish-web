import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class RuleName {
  @PrimaryColumn()
  id: string

  @Column()
  godName: string

  @Column()
  number: number
}
