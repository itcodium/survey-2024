import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose'; // Import MongooseSchema for ObjectId
import { SurveyQuestion } from './survey-question.entity';

@Schema()
export class Survey extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'SurveyQuestion' }] })
  questions: SurveyQuestion[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'SurveyAnswer' }] })
  answers: string[]; // Assuming SurveyAnswer is another entity

  @Prop()
  vigenciaDesde: Date;

  @Prop()
  vigenciaHasta: Date;

  @Prop({ default: true })
  isEnabled: boolean;

  @Prop({ default: false })
  isDefault: boolean;

  @Prop({ default: Date.now })
  created: Date;

  @Prop()
  createdBy: string;
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
