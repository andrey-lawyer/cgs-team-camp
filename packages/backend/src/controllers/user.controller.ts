import { Response, Request } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';
import jwt from 'jsonwebtoken';
// eslint-disable-next-line import/no-extraneous-dependencies

import UserService from '../services/user.service';
import { IGetUserAuthInfoRequest } from '../types/user.types';

export class UserController {
  constructor(private userService: UserService) {}

  async registerUser(req: IGetUserAuthInfoRequest, res: Response) {
    res.status(200).json({
      message: 'Signup successful',
      user: req.user
    });
  }

  async loginUser(req: IGetUserAuthInfoRequest, res: Response) {
    const { user } = req;

    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    return res.status(200).json({ token });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async forgetPasswordUser(req: Request, res: Response) {
    const { email } = req.body;
    const emailUser = await this.userService.sendEmailForgotPassword(email);
    res.status(200).json({
      message: `mail sent successfully to ${emailUser}`
    });
  }

  async changePasswordUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const emailUser = await this.userService.sendEmailChangePassword(email, password);
    res.status(200).json({
      message: `mail sent successfully to ${emailUser}`
    });
  }

  verificationPassword = async (req: Request, res: Response) => {
    const { verificationToken } = req.params;
    const { password } = req.body;
    await this.userService.onNewPasswordUser(verificationToken, password);
    return res.status(200).json({ message: 'password updated successfully' });
  };

  verificationToken = async (req: Request, res: Response) => {
    const { verificationToken } = req.params;
    await this.userService.verificationUser(verificationToken);
    return res.status(200).json(`Verification successful`);
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
