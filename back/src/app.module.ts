import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from './files/files.module';
import { JobsModule } from './jobs/jobs.module';
import { Job } from 'bullmq';

@Module({
    imports: [
        BullModule.forRoot({
            connection: {
                host: 'localhost',
                port: 6379,
            },
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: 'localhost',
            port: 3306,
            username: "root",
            password: "root",
            database: "coursero",
            entities: [Job],
            synchronize: true,
        }),
        FilesModule,
        JobsModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
