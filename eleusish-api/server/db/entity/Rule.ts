import { Entity, Column, PrimaryColumn } from 'typeorm'
import { Player } from './Player'
import { ManyToOne } from 'typeorm'

@Entity()
export class Rule {
  @PrimaryColumn()
  id: string

  @ManyToOne((type) => Player)
  author: Player

  @Column()
  code: string

  @Column()
  validated: boolean
}
