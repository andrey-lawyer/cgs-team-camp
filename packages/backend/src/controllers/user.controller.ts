import { Response, Request } from 'express';
import UserService from '../services/user.service';

export class UserController {
  constructor(private userService: UserService) {}

  async registerUser(req: Request, res: Response) {
    const newUser = req.body;
    const data = await this.userService.addUser(newUser);

    if (data) return res.status(201).json({ data, status: 'success' });
    return res.status(404).json({ status: 'Not found' });
  }
}

const userController = new UserController(new UserService());
export default userController;
