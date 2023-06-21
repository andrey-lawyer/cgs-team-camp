export type Test = 'public' | 'private';

export interface ITodo {
  id?: string;
  title: string;
  description: string;

  complete: boolean;

  access: Test;
}
