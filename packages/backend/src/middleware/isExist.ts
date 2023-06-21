import { Response, Request, NextFunction } from 'express';
import { getConnection } from 'typeorm';

import Todo from '../entities/Todo';
import { HttpError } from '../helpers/errors';

export const isExist = async (req: Request, res: Response, next: NextFunction) => {
  const { todoId } = req.params;
  const newConnection = getConnection();
  const todoRepository = newConnection.getRepository(Todo);
  const todo = await todoRepository.findOne({ where: { id: todoId } });
  if (todo) {
    next();
  } else {
    throw new HttpError('Not found', 404);
  }
};
