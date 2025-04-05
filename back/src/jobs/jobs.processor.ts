import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job as BullMqJob } from 'bullmq';
import { ProcessedJob } from './jobs.entity';
import { extract } from "zip-lib"
import { writeFile } from 'node:fs';

@Processor("jobs")
export class JobsConsummer extends WorkerHost {
    async process(job: BullMqJob<ProcessedJob>): Promise<any> {
        console.log("Job Data", job.data)
        console.log("Buffer", job.data.file.buffer)
        writeFile(`${process.cwd()}/data/${job.data.job.uuid}.zip`, Buffer.from(job.data.file.buffer["data"]), {}, (err) => {
            if (err) {
                throw err
            }
            extract(`${process.cwd()}/data/${job.data.job.uuid}.zip`, `${process.cwd()}/data/${job.data.job.uuid}`)
                .then(() => {

                })
                .catch(() => {
                    throw new Error(`Error white decompression the zip of job ^${job.data.job.uuid}`)
                })
        })
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
