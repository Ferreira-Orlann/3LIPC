import { IsString, IsUUID } from "class-validator";
import { randomUUID, UUID } from "crypto";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from "./files.type";
import { Exercice } from "src/exercices/exercices.entity";

export enum JobStatus {
    WAITING = "waiting",
    PROCESSING = "processing",
    FINISHED = "finished",
    ERROR = "error"
}

export enum JobGrade {
    S = "S",
    A = "A",
    B = "B",
    C = "C",
    D = "D"
}

export class CreateJobDto {
    @IsString()
    name: string
    @IsUUID()
    exercice_uuid: UUID
}

export enum SchoolClass {
    FIRST_YEAR = "first",
    SECOND_YEAR = "second",
    THIRD_YEAR = "third"
}

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        default: randomUUID()
    })
    uuid: UUID

    @Column()
    name: string

    @Column({
        enum: JobStatus,
        default: JobStatus.PROCESSING
    })
    status: JobStatus

    @Column({
        nullable: true,
        enum: JobGrade
    })
    grade: JobGrade

    @CreateDateColumn()
    publish_date: Date

    @Column({
        nullable: true
    })
    finish_data: Date

    @Column({
        nullable: true
    })
    completion_time: number

    @ManyToOne(() => Exercice, (exercice) => exercice.jobs, {eager: true})
    exercice: Exercice
}

export type ProcessedJob = {
    job: Job,
    file: File
}