import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SurveyType extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ default: Date.now })
  created: Date;
}

export const SurveyTypeSchema = SchemaFactory.createForClass(SurveyType);
