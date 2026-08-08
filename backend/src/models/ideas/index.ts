import { model, Model } from 'mongoose';
import { ideaSchema, IIdeaDocument } from './schema';
import { applyIdeaMethods } from './methods';
import { applyIdeaStatics } from './statics';

applyIdeaMethods(ideaSchema);
applyIdeaStatics(ideaSchema);

export const Idea = model<IIdeaDocument, Model<IIdeaDocument>>('Idea', ideaSchema);