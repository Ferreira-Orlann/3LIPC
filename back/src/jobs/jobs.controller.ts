import { Body, Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, ParseUUIDPipe, Post, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { CreateJobDto, Job } from "./jobs.entity";
import { JobsService } from "./jobs.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ExercicesService } from "src/exercices/exercices.service";
import { UUID } from "crypto";

@Controller("jobs")
export class JobsController {
    constructor(
        private readonly jobsService: JobsService,
        private readonly exercicesService: ExercicesService
    ) {}

    @UseInterceptors(FileInterceptor("file"))
    @Post()
    async post(@UploadedFile(
        new ParseFilePipeBuilder()
            .addMaxSizeValidator({
                maxSize: 500000000
            })
            .addFileTypeValidator({
                fileType: "zip"
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }
    )) file: Express.Multer.File, @Body(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true
    })) dto: CreateJobDto) {
        const jobData: Partial<Job> = dto
        jobData.exercice = await this.exercicesService.findOneByUuid(dto.exercice_uuid)
        return this.jobsService.create(dto, {
            name: file.originalname,
            buffer: file.buffer
        })
    }

    @Get()
    getAll(): Promise<Job[]> {
        return this.jobsService.findAll();
    }

    @Get(":uuid")
    getOne(@Param("uuid", ParseUUIDPipe) uuid: UUID): Promise<Job> {
        return this.jobsService.findOneByUuid(uuid);
    }
}