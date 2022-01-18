import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Messages16413224725 implements MigrationInterface {

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
        },
        {
        name: 'user_id',
        type: 'integer',
        isNullable: false,
        }
      ],
      foreignKeys: [
          new TableForeignKey({
            name: "messages_user",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["uid"],
          }),
        ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('messages');
  }

}
