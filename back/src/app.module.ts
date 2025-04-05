import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsModule } from './jobs/jobs.module';
import { Job } from './jobs/jobs.entity';
import { JobsConsummer } from './jobs/jobs.processor';
import { Exercice } from './exercices/exercices.entity';

@Module({
    imports: [
        BullModule.forRoot({
            connection: {
                host: 'localhost',
                password: "password",
                port: 6379,
            }
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: 'localhost',
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "coursero",
            entities: [Job, Exercice],
            synchronize: true
        }),
        JobsModule
    ],
    controllers: [],
    providers: [JobsConsummer],
})
export class AppModule {}
