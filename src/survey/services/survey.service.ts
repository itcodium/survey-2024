import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Survey } from '../entities/survey.entity';
import { SurveyQuestion } from '../entities/survey-question.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectModel(Survey.name) private surveyModel: Model<Survey>,
    @InjectModel(SurveyQuestion.name) private surveyQuestionModel: Model<SurveyQuestion>,

  ) { }

  async create(surveyDto: Survey): Promise<Survey> {
    const createdSurvey = new this.surveyModel(surveyDto);
    return createdSurvey.save();
  }

  async findAll(): Promise<Survey[]> {
    return this.surveyModel.find().exec();
  }

  async findOne(id: string): Promise<Survey> {
    return this.surveyModel.findById(id).exec();
  }

  async update(id: string, surveyDto: Survey): Promise<Survey> {
    return this.surveyModel.findByIdAndUpdate(id, surveyDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Survey> {
    return this.surveyModel.findByIdAndDelete(id).exec();
  }
 
  
  async createSurveyAndInitialize(): Promise<Survey> {
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

    // Create a new survey instance
    const newSurvey = new this.surveyModel({
      name: 'New Survey',
      questions: [],
      created: new Date(),
    });

    // Initialize questions for each type and add to the survey
    for (const type of typesToInitialize) {
      const questionsForType = await this.generateQuestionsForType(type);
      newSurvey.questions.push(...questionsForType);
    }

    // Save the new survey
    return await newSurvey.save();
  }

  private async generateQuestionsForType(type: string): Promise<SurveyQuestion[]> {
    const questions: SurveyQuestion[] = [];

    switch (type) {
      case "LIST":
        questions.push(
          new this.surveyQuestionModel({
            type: "LIST",
            question: "List question 1",
            created: new Date(),
          }),
          new this.surveyQuestionModel({
            type: "LIST",
            question: "List question 2",
            created: new Date(),
          })
        );
        break;
      case "MATRIX":
        questions.push(
          new this.surveyQuestionModel({
            type: "MATRIX",
            question: "Matrix question 1",
            created: new Date(),
          }),
          new this.surveyQuestionModel({
            type: "MATRIX",
            question: "Matrix question 2",
            created: new Date(),
          })
        );
        break;
      case "DATETIME":
        questions.push(
          new this.surveyQuestionModel({
            type: "DATETIME",
            question: "Datetime question 1",
            created: new Date(),
          }),
          new this.surveyQuestionModel({
            type: "DATETIME",
            question: "Datetime question 2",
            created: new Date(),
          })
        );
        break;
      case "CHECKLIST":
        questions.push(
          new this.surveyQuestionModel({
            type: "CHECKLIST",
            question: "Checklist question 1",
            created: new Date(),
          }),
          new this.surveyQuestionModel({
            type: "CHECKLIST",
            question: "Checklist question 2",
            created: new Date(),
          })
        );
        break;
      case "SELECT":
        questions.push(
          new this.surveyQuestionModel({
            type: "SELECT",
            question: "Select question 1",
            created: new Date(),
          }),
          new this.surveyQuestionModel({
            type: "SELECT",
            question: "Select question 2",
            created: new Date(),
          })
        );
        break;
      case "CUSTOM":
        questions.push(
          new this.surveyQuestionModel({
            type: "CUSTOM",
            question: "Custom question 1",
            created: new Date(),
          }),
          new this.surveyQuestionModel({
            type: "CUSTOM",
            question: "Custom question 2",
            created: new Date(),
          })
        );
        break;
      case "QUALITY":
        questions.push(
          new this.surveyQuestionModel({
            type: "QUALITY",
            question: "Quality question 1",
            created: new Date(),
          }),
          new this.surveyQuestionModel({
            type: "QUALITY",
            question: "Quality question 2",
            created: new Date(),
          })
        );
        break;
      case "TIME":
        questions.push(
          new this.surveyQuestionModel({
            type: "TIME",
            question: "Time question 1",
            created: new Date(),
          }),
          new this.surveyQuestionModel({
            type: "TIME",
            question: "Time question 2",
            created: new Date(),
          })
        );
        break;
      default:
        break;
    }

    // Save all questions asynchronously
    return await this.surveyQuestionModel.insertMany(questions);
  }
 

}
