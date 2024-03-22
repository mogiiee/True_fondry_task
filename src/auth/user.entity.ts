import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  githubId: string;

  @Column({nullable: true })
  username: string;

  @Column({ nullable: true })
  displayName: string;

  @Column({nullable: true })
  avatarUrl: string;

  @Column({nullable: true })
  publicRepos: number;

  @Column({nullable: true })
  stars: number;

  @Column({ nullable: true })
  profileUrl: string;

  @Column('simple-json', { nullable: true })
  profile: JSON; // Stores the entire profile object as JSON

  @Column()
  accessToken: string;
}
