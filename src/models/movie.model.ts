import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class MovieModel {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  title: string;

  @Column({ type: 'int', nullable: true })
  year: number;

  @Column({ type: 'text', nullable: true })
  synopsis: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  director: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nationality: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  posterURL: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'json', nullable: true })
  genres: string[];
}
