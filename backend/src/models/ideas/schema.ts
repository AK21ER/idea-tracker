import { Schema, Document, Types } from 'mongoose';

export interface IIdea {
  title: string;
  description: string;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IIdeaDocument extends IIdea, Document {
  _id: Types.ObjectId;
  toSafeObject(): {
    id: Types.ObjectId;
    title: string;
    description: string;
    owner: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  };
}

export const ideaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 2000,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);