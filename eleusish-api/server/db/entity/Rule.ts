import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'
import { Player } from './Player'
import { RuleName } from './RuleName'

@Entity()
export class Rule {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => Player)
  author: Player

  @ManyToOne(() => RuleName)
  ruleName: RuleName

  @Column()
  code: string

  @Column()
  validated: boolean

  @Column({ nullable: true })
  index: number

  @Column()
  shortDescription: string
}
