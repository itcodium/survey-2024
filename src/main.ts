import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SurveyTypeService } from './survey/services/survey-type.service';
import { SurveyService } from './survey/services/survey.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const surveyTypeService = app.get(SurveyTypeService);
  const surveyService = app.get(SurveyService);
  await surveyTypeService.initializeTypes();
  await surveyService.createSurveyAndInitialize();
  await app.listen(3000);
}
bootstrap();
