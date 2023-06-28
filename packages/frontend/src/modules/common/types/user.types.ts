export interface IPassword {
  password: string;
}

export interface IUser {
  email: string;
  password?: string;
  id?: string;
  validation?: string;
}

export interface IEmail {
  email: string;
}
