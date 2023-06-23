export interface IForm {
  title: string;
  description: string;
  access: string;
  complete: string;
}

export interface IUpdateTodo {
  id: string;
  title: string;
  description: string;
  access: string;
  complete: boolean;
}
