import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { Survey } from '../entities/survey.entity';
import { SurveyService } from '../services/survey.service';

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  async create(@Body() surveyDto: Survey): Promise<Survey> {
    return this.surveyService.create(surveyDto);
  }

  @Get()
  async findAll(): Promise<Survey[]> {
    return this.surveyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Survey> {
    const survey = await this.surveyService.findOne(id);
    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }
    return survey;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() surveyDto: Survey): Promise<Survey> {
    const updatedSurvey = await this.surveyService.update(id, surveyDto);
    if (!updatedSurvey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }
    return updatedSurvey;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Survey> {
    const deletedSurvey = await this.surveyService.delete(id);
    if (!deletedSurvey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }
    return deletedSurvey;
  }
}
