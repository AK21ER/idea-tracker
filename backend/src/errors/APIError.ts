import { APPError } from './APPError';

export class APIError extends APPError {
  public readonly statusCode: number;
  public readonly isPublic: boolean;

  constructor(message: string, statusCode = 500, isPublic = true) {
    super(message, true);

    this.statusCode = statusCode;
    this.isPublic = isPublic;
  }
}