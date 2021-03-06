import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateAppointments1589845210425 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            // default: 'uuid_generate_v4()'
          }, {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          }, {
            name: 'date',
            type: 'timestamp',
            isNullable: false,
          }, {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()'
          }, {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('appointments');
  }

}
