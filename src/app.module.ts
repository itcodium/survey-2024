import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://testuser:SurPass123!@survey0001.dwoc5.mongodb.net/survey-24?retryWrites=true&w=majority' ),
    SurveyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
