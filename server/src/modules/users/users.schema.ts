import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name!: string;

  @Prop({ unique: true })
  email!: string;

  @Prop({ unique: true })
  phone!: string;

  // @Prop({ default: 0 })
  // balance!: number;

  @Prop()
  password!: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.index({ email: 1 });
// UserSchema.index({ hp: 1 });
