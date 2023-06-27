export interface ITodo {
  id?: string;
  title?: string;
  description?: string;
  complete?: boolean;
  access?: string;
}

export interface ITodoCheck {
  id: string;
  title: string;
  description: string;
  complete: boolean;
  access: string;
}
