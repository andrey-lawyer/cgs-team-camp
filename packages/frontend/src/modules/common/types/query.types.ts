import { ITodoCheck } from './todo.types';

export interface IResponse {
  data: ITodoCheck[];
  status: 'success';
}

export interface IResponseId {
  data: ITodoCheck;
  status: 'success';
}

interface iQueryCommon {
  isLoading: boolean;
  error: unknown;
}

export interface iQuery extends iQueryCommon {
  data: IResponse | undefined;
}

export interface iQueryId extends iQueryCommon {
  data: ITodoCheck | undefined;
}
