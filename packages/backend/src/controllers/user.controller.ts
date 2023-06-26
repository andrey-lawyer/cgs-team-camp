import { Response, Request } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from 'nanoid';
import { getConnection } from 'typeorm';
import { transporter } from '../config/nodemailer';
import User from '../entities/User';

import UserService from '../services/user.service';

export class UserController {
  constructor(private userService: UserService) {}
  
  BASE_URL_FRONT = 'http://localhost:3000/';

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
  async forgetPasswordUser(req: Request, _: Response) {
    const { email } = req.body;
    const newConnection = await getConnection();
    const userRepository = newConnection.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    // eslint-disable-next-line prettier/prettier
    const verification = nanoid();

    const emailOptions = {
      from: 'realvostok@meta.ua',
      to: user.email,
      subject: 'password recovery',
      html: `<a target="_blank" href="${this.BASE_URL_FRONT}/password-recovery/${verification}">Click link</a>`
    };
    await transporter.sendMail(emailOptions);
    await userRepository.update({ email: user.email }, { ...user, verification });
  }

  recoveryPassword = async (req: Request, res: Response) => {
    const { verificationToken } = req.params;
    const newConnection = await getConnection();
    const userRepository = newConnection.getRepository(User);
    const user = await userRepository.findOne({ where: { verification: verificationToken } });
    if (!user) {
      throw new Error('User not found');
    }
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userRepository.update(
      { verification: verificationToken },
      { ...user, password: hashedPassword }
    );
    const updateUser = { email: user.email, id: user.id };
    const token = jwt.sign({ updateUser }, process.env.JWT_SECRET);
    return res.json({ token });
  };

  logoutUser(req: Request, res: Response) {
    req.logout((err) => {
      if (err) {
        throw new Error(err);
      }
      req.session.destroy(() => {
        res.redirect('/');
      });
      // res.redirect('/');
    });
  }
}
// const userController = new UserController();
const userController = new UserController(new UserService());
export default userController;
