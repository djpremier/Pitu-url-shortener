import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('links')
class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 275 })
  url: string;

  @Column({ length: 20, unique: true })
  code: string;

  @Column("integer", { default: 0 })
  hits: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
};

export default Link;
