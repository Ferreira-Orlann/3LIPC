import { Body, Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { CreateJobDto } from "./jobs.entity";
import { JobsService } from "./jobs.service";
import { File } from "./files.type"
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("jobs")
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @UseInterceptors(FileInterceptor("file"))
    @Post()
    post(@UploadedFile(
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
        return this.jobsService.create(dto, {
            name: file.originalname,
            buffer: file.buffer
        })
    }
}