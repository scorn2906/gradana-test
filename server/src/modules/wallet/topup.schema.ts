import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TopupDocument = Topup & Document;

@Schema({ timestamps: true })
export class Topup {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ required: true })
  balance!: number;

  @Prop({ default: Date.now })
  date!: Date;

  @Prop()
  createdAt?: Date;
  @Prop()
  updatedAt?: Date;
}

export const TopupSchema = SchemaFactory.createForClass(Topup);
