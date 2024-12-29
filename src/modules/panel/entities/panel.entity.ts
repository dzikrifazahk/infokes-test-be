import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'panel' })
export class PanelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
  })
  name: string;

  @Column({
    name: 'parent_id',
    type: 'varchar',
    nullable: true,
    default: null,
  })
  parentId: string;

  @Column({
    name: 'position',
    type: 'varchar',
    default: null,
    nullable: true,
  })
  position: string;

  @Column({
    name: 'is_header',
    type: 'boolean',
    default: false,
  })
  isHeader: boolean;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
    default: null
  })
  description: string;
}
