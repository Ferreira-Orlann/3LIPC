import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "./jobs.entity";
import { JobsController } from "./jobs.controller";
import { JobsService } from "./jobs.service";
import { BullModule } from "@nestjs/bullmq";
import { ExercicesModule } from "src/exercices/exercices.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Job]),
        BullModule.registerQueue({
            name: "jobs",
        }),
        ExercicesModule
    ],
    controllers: [
        JobsController
    ],
    providers: [
        JobsService
    ]
})
export class JobsModule {}