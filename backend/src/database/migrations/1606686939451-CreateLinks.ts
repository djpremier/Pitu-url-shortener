import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateLinks1606686939451 implements MigrationInterface {
    name = 'CreateLinks1606686939451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "links" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(275) NOT NULL, "code" character varying(20) NOT NULL, "hits" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_52a3fa2a2c27a987ed58fd2ea42" UNIQUE ("code"), CONSTRAINT "PK_ecf17f4a741d3c5ba0b4c5ab4b6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "links"`);
    }

}
