import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SurveyType } from '../entities/survey-type.entity';

@Injectable()
export class SurveyTypeService {
    constructor(
        @InjectModel(SurveyType.name) private surveyTypeModel: Model<SurveyType>,
    ) { }

    async create(surveyTypeDto: SurveyType): Promise<SurveyType> {
        const createdSurveyType = new this.surveyTypeModel(surveyTypeDto);
        return createdSurveyType.save();
    }

    async findAll(): Promise<SurveyType[]> {
        return this.surveyTypeModel.find().exec();
    }

    async findOne(id: string): Promise<SurveyType> {
        return this.surveyTypeModel.findById(id).exec();
    }

    async update(id: string, surveyTypeDto: SurveyType): Promise<SurveyType> {
        return this.surveyTypeModel.findByIdAndUpdate(id, surveyTypeDto, { new: true }).exec();
    }

    async delete(id: string): Promise<SurveyType> {
        return this.surveyTypeModel.findByIdAndDelete(id).exec();
    }
    async initializeTypes(): Promise<void> {
        const typesToInitialize = [
            "LIST",
            "MATRIX",
            "DATETIME",
            "CHECKLIST",
            "SELECT",
            "CUSTOM",
            "QUALITY",
            "TIME"
        ];

        for (const type of typesToInitialize) {
            const existingType = await this.surveyTypeModel.findOne({ type }).exec();
            if (!existingType) {
                const newType = new this.surveyTypeModel({ type });
                await newType.save();
            }
        }
    }
}
