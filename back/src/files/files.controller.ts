import { Controller, HttpStatus, ParseFilePipeBuilder, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller("upload")
export class FilesController {
    @UseInterceptors(FilesInterceptor("files"))
    uploadFile(@UploadedFiles(
        new ParseFilePipeBuilder()
            .addMaxSizeValidator({
                maxSize: 500000000
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }
    ),
    ) files: Express.Multer.File[]) {
        console.log(files);
    }
}