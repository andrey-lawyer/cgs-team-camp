import { ITodo } from '../common/types/todo.types';
import { APP_KEYS } from '../common/consts';
import { HttpService } from './htpp';
import { IEmail, IPassword, IUser } from '../common/types/user.types';

export class UserService extends HttpService {
  constructor() {
    super();
  }

  async registerUser(newUser: IUser) {
    const { data } = await this.post({
      url: `${APP_KEYS.QUERY_KEYS.USER}/register`,
      data: newUser
    });
    return data;
  }

  async loginUser(user: IUser) {
    const { data } = await this.post({
      url: `${APP_KEYS.QUERY_KEYS.USER}/login`,
      data: user
    });
    return data;
  }

  async changePassword(user: IUser) {
    const { data } = await this.post({
      url: `${APP_KEYS.QUERY_KEYS.USER}/change-password`,
      data: user
    });
    return data;
  }
  async forgotPassword(email: IEmail) {
    const { data } = await this.post({
      url: `${APP_KEYS.QUERY_KEYS.USER}/forgot-password`,
      data: email
    });
    return data;
  }

  async getVerification(verificationToken: string) {
    const { data } = await this.get({
      url: `${APP_KEYS.QUERY_KEYS.USER}/verify-register/${verificationToken}`
    });
    return data;
  }

  async postVerificationPassword(verificationToken: string, password: IPassword) {
    const { data } = await this.post({
      url: `${APP_KEYS.QUERY_KEYS.USER}/verify/${verificationToken}`,
      data: password
    });
    return data;
  }

  async logout() {
    const { data } = await this.delete({
      url: `${APP_KEYS.QUERY_KEYS.USER}/logout`
    });
    return data;
  }
}

export const apiUser = new UserService();
