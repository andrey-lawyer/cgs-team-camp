import { getConnection } from 'typeorm';
import User from '../entities/User';
import { IUser } from '../types/user.types';

export default class UserService {
  async addUser(user: IUser) {
    const newConnection = await getConnection();
    const userRepository = newConnection.getRepository(User);
    try {
      const data = await userRepository.save(user);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return console.log(err.message);
      }
      console.log(err);
    }
  }
}
