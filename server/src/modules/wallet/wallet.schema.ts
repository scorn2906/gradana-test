import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class TopupHistory {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ required: true })
  balance!: number;

  @Prop({ default: Date.now })
  date!: Date;
}
@Schema({ timestamps: true })
export class Wallet {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId!: Types.ObjectId;

  @Prop({ default: 0 })
  balance!: number;

  @Prop([
    {
      balance: Number,
      date: Date,
    },
  ])
  topupHistory!: TopupHistory[];
}

export const WalltetSchema = SchemaFactory.createForClass(Wallet);
