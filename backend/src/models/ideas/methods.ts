import { Schema } from 'mongoose';
import { IIdeaDocument } from './schema';

export const applyIdeaMethods = (schema: Schema) => {
  schema.methods.toSafeObject = function (this: IIdeaDocument) {
    return {
      id: this._id,
      title: this.title,
      description: this.description,
      owner: this.owner,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  };
};