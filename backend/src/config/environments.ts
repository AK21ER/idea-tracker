import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(5000),
  MONGO_URI: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().min(20).required(),
  JWT_EXPIRES_IN: Joi.string().default('1d'),
  GOOGLE_CLIENT_ID: Joi.string().allow('').optional(),
  GOOGLE_CLIENT_SECRET: Joi.string().allow('').optional(),
  FACEBOOK_CLIENT_ID: Joi.string().allow('').optional(),
  FACEBOOK_CLIENT_SECRET: Joi.string().allow('').optional(),
}).unknown(true); //"only validate the keys I listed; ignore the rest.

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

export const config = {
  nodeEnv: envVars.NODE_ENV as string,
  port: envVars.PORT as number,
  mongoUri: envVars.MONGO_URI as string,
  jwtSecret: envVars.JWT_SECRET as string,
  jwtExpiresIn: envVars.JWT_EXPIRES_IN as string,
  google: {
    clientId: envVars.GOOGLE_CLIENT_ID as string,
    clientSecret: envVars.GOOGLE_CLIENT_SECRET as string,
  },
  facebook: {
    clientId: envVars.FACEBOOK_CLIENT_ID as string,
    clientSecret: envVars.FACEBOOK_CLIENT_SECRET as string,
  },
};