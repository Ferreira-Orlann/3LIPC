import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Exercice } from "./exercices.entity";
import { File } from "../jobs/files.type"
import { UUID } from "crypto";

@Injectable()
export class ExercicesService {
    constructor(
        @InjectRepository(Exercice) private readonly repo: Repository<Exercice>,
    ) {}

    findAll(): Promise<Exercice[]> {
        return this.repo.find();
    }

    findOne(id: number): Promise<Exercice> {
        return this.repo.findOne({ where: { id: id } }).then(exercice => {
            if (!exercice) {
                throw new NotFoundException(`Exercice with ID ${id} not found`);
            }
            return exercice;
        });
    }

    findOneByUuid(uuid: UUID): Promise<Exercice> {
        return this.repo.findOne({ where: { uuid: uuid } }).then(exercice => {
            if (!exercice) {
                throw new NotFoundException(`Exercice with UUID ${uuid} not found`);
            }
            return exercice;
        });
    }

    create(exerciceData: Partial<Exercice>, file: File): Promise<Exercice> {
        exerciceData.code = file.buffer
        let exercice = this.repo.create(exerciceData);
        return this.repo.save(exercice)
    }

    update(id: number, jobData: Partial<Exercice>): Promise<Exercice> {
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