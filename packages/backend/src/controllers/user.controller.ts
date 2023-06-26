import { Response, Request } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';
import jwt from 'jsonwebtoken';
// eslint-disable-next-line import/no-extraneous-dependencies

import UserService from '../services/user.service';

export class UserController {
  constructor(private userService: UserService) {}

  async registerUser(req: Request, res: Response) {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }

  async loginUser(req: Request, res: Response) {
    const { user } = req;

    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    return res.json({ token });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async forgetPasswordUser(req: Request, res: Response) {
    const { email } = req.body;
    const emailUser = await this.userService.sendEmail(email);
    res.json({
      message: `mail sent successfully to ${emailUser}`
    });
  }

  recoveryPassword = async (req: Request, res: Response) => {
    const { verificationToken } = req.params;
    const { password } = req.body;
    const token = await this.userService.newPassword(verificationToken, password);

    return res.json({ message: 'password updated successfully', token });
  };

  logoutUser(req: Request, res: Response) {
    req.logout((err) => {
      if (err) {
        throw new Error(err);
      }
      req.session.destroy(() => {
        res.redirect('/');
      });
    });
  }
}
const userController = new UserController(new UserService());
export default userController;
