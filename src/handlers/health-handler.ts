import { Request, Response } from 'express';

export function healthCheck(req: Request, res: Response): void {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'todo-rest-api',
  });
}
