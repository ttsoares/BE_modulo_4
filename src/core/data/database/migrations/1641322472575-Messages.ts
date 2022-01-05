import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Messages1641322472575 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'messages',
      columns: [
        {
          name: 'uid',
          type: 'integer',
          isPrimary: true,
          isNullable: false,
        },
        {
          name: 'description',
          type: 'varchar',
          length: '45',
          isNullable: false,
        },
        {
          name: 'details',
          type: 'varchar',
          length: '150',
          isNullable: false,
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('messages');
  }

}
