import { IsNumber, IsString } from "class-validator";
import { randomUUID, UUID } from "crypto";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { File } from "./files.type";

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
}

export type ProcessedJob = {
    job: Job,
    file: File
}