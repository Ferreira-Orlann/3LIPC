import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "./jobs.entity";
import { Repository } from "typeorm";

@Injectable()
export class JobsService {
    constructor(@InjectRepository(Job) private readonly repo: Repository<Job>) {}

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

    create(jobData: Partial<Job>): Promise<Job> {
        const job = this.repo.create(jobData);
        return this.repo.save(job);
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