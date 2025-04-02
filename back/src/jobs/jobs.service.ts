import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job, ProcessedJob } from "./jobs.entity";
import { Repository } from "typeorm";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { File } from "./files.type";

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Job) private readonly repo: Repository<Job>,
        @InjectQueue("jobs") private readonly queue: Queue  
    ) {}

    findAll(): Promise<Job[]> {
        return this.repo.find();
    }

    findOne(id: number): Promise<Job> {
        return this.repo.findOne({ where: { id } }).then(job => {
            if (!job) {
                throw new NotFoundException(`Job with ID ${id} not found`);
            }
            return job;
        });
    }

    create(jobData: Partial<Job>, file: File): Promise<Job> {
        let job = this.repo.create(jobData);
        return new Promise(async (resolve, reject) => {
            job = await this.repo.save(job)
            resolve(job)
            this.queue.add(job.uuid, {
                job: job,
                file: file
            } as ProcessedJob, {
                jobId: job.uuid
            })
        })
    }

    update(id: number, jobData: Partial<Job>): Promise<Job> {
        return this.findOne(id).then(() => {
            return this.repo.update(id, jobData).then(() => this.findOne(id));
        });
    }

    remove(id: number): Promise<void> {
        return this.findOne(id).then(job => {
            return this.repo.remove(job).then(() => undefined);
        });
    }
}