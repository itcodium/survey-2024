import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class SurveyQuestion extends Document {
  @Prop({ type: MongooseSchema.Types.Mixed })
  type: any;

  @Prop({ required: true })
  question: string;

  @Prop()
  list?: any[];

  @Prop()
  columns?: any[];

  @Prop()
  labelLeft?: string;

  @Prop()
  labelRight?: string;

  @Prop({ default: Date.now })
  created?: Date;
}

export const SurveyQuestionSchema = SchemaFactory.createForClass(SurveyQuestion);
