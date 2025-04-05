import { Body, Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, ParseUUIDPipe, Post, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ExercicesService } from "./exercices.service";
import { CreateExerciceDto, Exercice } from "./exercices.entity";
import { UUID } from "crypto";

@Controller("exercices")
export class ExercicesController {
    constructor(private readonly exercicesService: ExercicesService) {}

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
    })) dto: CreateExerciceDto) {
        return this.exercicesService.create(dto, {
            name: file.originalname,
            buffer: file.buffer
        })
    }

    @Get()
    getAll(): Promise<Exercice[]> {
        return this.exercicesService.findAll();
    }

    @Get(":uuid")
    getOne(@Param("uuid", ParseUUIDPipe) uuid: UUID): Promise<Exercice> {
        return this.exercicesService.findOneByUuid(uuid);
    }
}