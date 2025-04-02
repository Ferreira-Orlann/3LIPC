import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "./jobs.entity";
import { JobsController } from "./jobs.controller";
import { JobsService } from "./jobs.service";
import { BullModule } from "@nestjs/bullmq";

@Module({
    imports: [
        TypeOrmModule.forFeature([Job]),
        BullModule.registerQueue({
            name: "jobs",
        })
    ],
    controllers: [
        JobsController
    ],
    providers: [
        JobsService
    ]
})
export class JobsModule {}