import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class Player {
  @PrimaryColumn()
  id: string

  @Column()
  pseudo: string
}
