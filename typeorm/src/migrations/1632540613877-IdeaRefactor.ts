import { MigrationInterface, QueryRunner } from 'typeorm';

export class IdeaRefactor1632540613877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "idea" RENAME COLUMN "name" TO "description"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "idea" RENAME COLUMN "description" TO "name"`,
    );
  }
}
