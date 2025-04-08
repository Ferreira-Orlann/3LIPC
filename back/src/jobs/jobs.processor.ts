import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job as BullMqJob } from 'bullmq';
import { ProcessedJob } from './jobs.entity';
import { extract } from "zip-lib"
import { writeFile, mkdirSync, existsSync } from 'node:fs';
import * as path from 'path';

@Processor("jobs")
export class JobsConsummer extends WorkerHost {
    async process(job: BullMqJob<ProcessedJob>): Promise<any> {
        console.log("Job Data", job.data);
        console.log("Buffer", job.data.file.buffer);

        const jobDir = path.join(process.cwd(), 'data', job.data.job.uuid);
        const zipPath = path.join(jobDir, `.zip`);

        // Vérification de l'existence du dossier 'data' et création si nécessaire
        if (!existsSync(path.join(process.cwd(), 'data'))) {
            mkdirSync(path.join(process.cwd(), 'data'), { recursive: true });
        }

        // Vérification de l'existence du dossier spécifique au job et création si nécessaire
        if (!existsSync(jobDir)) {
            mkdirSync(jobDir, { recursive: true });
        }

        // Écrire le fichier ZIP
        writeFile(zipPath, Buffer.from(job.data.file.buffer["data"]), {}, (err) => {
            if (err) {
                throw err;
            }

            // Extraire le contenu du fichier ZIP
            extract(zipPath, jobDir)
                .then(() => {
                    console.log(`Successfully extracted zip for job ${job.data.job.uuid}`);
                })
                .catch(() => {
                    throw new Error(`Error while decompressing the zip of job ^${job.data.job.uuid}`);
                });
        });
    }

    @OnWorkerEvent("completed")
    onCompleted() { 

    }

    @OnWorkerEvent("error")
    onError(error) {
        console.log(error)
    }

    @OnWorkerEvent("failed")
    onFailed(job, error, prev) {
        console.log(job, error, prev)
    }
}
