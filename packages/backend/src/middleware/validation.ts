import { Request, Response, NextFunction } from 'express';

const Joi = require('joi');

export default class IsValidate {
  userValidation = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'ua'] }
        })
        .pattern(
          // eslint-disable-next-line no-useless-escape
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        )
        .required(),
      password: Joi.string()
        // eslint-disable-next-line no-useless-escape
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
        .required()
    });
    await this.validateRequest(schema, req, res, next);
  };

  userValidationEmail = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'ua'] }
        })
        .pattern(
          // eslint-disable-next-line no-useless-escape
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        )
    });
    await this.validateRequest(schema, req, res, next);
  };

  userValidationPassword = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      password: Joi.string()
        // eslint-disable-next-line no-useless-escape
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
        .required()
    });
    await this.validateRequest(schema, req, res, next);
  };

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
