import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { SurveyType, SurveyTypeSchema } from './entities/survey-type.entity';
import { Survey, SurveySchema } from './entities/survey.entity';
import { SurveyController } from './controllers/survey.controller';
import { SurveyService } from './services/survey.service';
import { SurveyTypeService } from './services/survey-type.service';
import { SurveyTypeController } from './controllers/survey-type.controller';
import { SurveyQuestion, SurveyQuestionSchema } from './entities/survey-question.entity';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: SurveyType.name, schema: SurveyTypeSchema },
        { name: Survey.name, schema: SurveySchema },
        { name: SurveyQuestion.name, schema: SurveyQuestionSchema },

    ]),
    ],
  controllers: [SurveyTypeController, SurveyController],
  providers: [SurveyTypeService, SurveyService],
})
export class SurveyModule {}

 