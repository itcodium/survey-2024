import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { SurveyTypeService } from '../services/survey-type.service';
import { SurveyType } from '../entities/survey-type.entity';

@Controller('survey-types')
export class SurveyTypeController {
  constructor(private readonly surveyTypeService: SurveyTypeService) {}

  @Post()
  async create(@Body() surveyTypeDto: SurveyType): Promise<SurveyType> {
    return this.surveyTypeService.create(surveyTypeDto);
  }

  @Get()
  async findAll(): Promise<SurveyType[]> {
    return this.surveyTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SurveyType> {
    const surveyType = await this.surveyTypeService.findOne(id);
    if (!surveyType) {
      throw new NotFoundException(`SurveyType with ID ${id} not found`);
    }
    return surveyType;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() surveyTypeDto: SurveyType): Promise<SurveyType> {
    const updatedSurveyType = await this.surveyTypeService.update(id, surveyTypeDto);
    if (!updatedSurveyType) {
      throw new NotFoundException(`SurveyType with ID ${id} not found`);
    }
    return updatedSurveyType;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<SurveyType> {
    const deletedSurveyType = await this.surveyTypeService.delete(id);
    if (!deletedSurveyType) {
      throw new NotFoundException(`SurveyType with ID ${id} not found`);
    }
    return deletedSurveyType;
  }
}
