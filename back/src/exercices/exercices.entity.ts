import { Exclude, Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { randomUUID, UUID } from "crypto";
import { Job } from "src/jobs/jobs.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class CreateExerciceDto {
    @IsString()
    name: string
    @IsString()
    exercice_number: string
    @IsString()
    class: string
}

export class SchoolClass {
    FIRST_YEAR: "first"
    SECOND_YEAR: "second"
    THIRD_YEAR: "third"
}

@Entity()
export class Exercice {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        default: randomUUID()
    })
    uuid: UUID

    @Column()
    name: string

    @Column()
    class: string

    @Column()
    exercice_number: string

    @Exclude()
    @Column({ 
        type: "bytea" 
    })
    code: Buffer;

    @OneToMany(() => Job, (job) => job.exercice)
    jobs: Job[]
}