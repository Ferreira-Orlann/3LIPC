import { randomUUID, UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        default: () => randomUUID()
    })
    uuid: UUID

    @Column()
    name: string

    @Column({
        enum: JobStatus
    })
    status: JobStatus

    @Column({
        nullable: true,
        enum: JobGrade
    })
    grade: JobGrade

    @Column()
    publish_date: Date

    @Column()
    finish_data: Date

    @Column()
    completion_time: number
}