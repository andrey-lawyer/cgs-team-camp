import { Request, Response, NextFunction } from 'express';

export const isExist = (controller: Function) => {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};
