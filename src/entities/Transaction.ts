import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column('int', { nullable: false })
  public clientId!: number;

  @Column('varchar', { nullable: false })
  public fromAddress!: string;

  @Column('varchar', { nullable: false })
  public toAddress!: string;

  @Column('varchar', { nullable: false })
  public currencyType!: string;

  @Column()
  public walletAddress!: string;

  @Column('varchar', { nullable: false })
  public transactionId!: string;

  @Column()
  public amount!: number;

  @Column('int', { nullable: false })
  public timestamp!: number;
}
