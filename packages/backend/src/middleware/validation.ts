import { Request, Response, NextFunction } from 'express';

const Joi = require('joi');

export default class IsValidate {
  validateRequest = async (schema: any, req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error: any) {
      return res.status(400).json({ message: error.details[0].message });
    }
  };

  addTodoValidation = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(20).required(),
      description: Joi.string().min(3).max(100).required(),
      access: Joi.alternatives(['public', 'private']).required(),
      complete: Joi.boolean().required()
    });
    await this.validateRequest(schema, req, res, next);
  };

  updateTodoValidation = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(20).optional(),
      description: Joi.string().min(3).max(100).optional(),
      access: Joi.alternatives(['public', 'private']).optional(),
      complete: Joi.boolean().optional()
    });
    await this.validateRequest(schema, req, res, next);
  };
}
