import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class User1641322351491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'users',
        columns: [
          {
            name: 'uid',
            type: 'integer',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '15',
            isNullable: false,
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users');
    }

}
