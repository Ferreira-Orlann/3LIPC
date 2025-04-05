import { TypeOrmModule } from "@nestjs/typeorm";
import { ExercicesController } from "./exercices.controller";
import { ExercicesService } from "./exercices.service";
import { Exercice } from "./exercices.entity";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        TypeOrmModule.forFeature([Exercice]),
    ],
    controllers: [
        ExercicesController
    ],
    providers: [
        ExercicesService
    ],
    exports: [
        ExercicesService
    ]
})
export class ExercicesModule {}