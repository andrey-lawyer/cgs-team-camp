import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import User from '../entities/User';
import { transporter } from '../config/nodemailer';

export default class UserService {
  BASE_URL_FRONT = 'http://localhost:3000/';

  async sendEmail(email: string) {
    const newConnection = await getConnection();
    const userRepository = newConnection.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    // eslint-disable-next-line prettier/prettier
    const verification = uuidv4();

    const emailOptions = {
      from: 'real_vostok@meta.ua',
      to: user.email,
      subject: 'password recovery',
      html: `<a target="_blank" href="${this.BASE_URL_FRONT}/password-recovery/${verification}">Click link</a>`
    };
    const send = await transporter.sendMail(emailOptions);
    const updateUser = await userRepository.update(
      { email: user.email },
      { ...user, verification }
    );
    if (send && updateUser) return email;
    throw new Error('update failed');
  }

  newPassword = async (verificationToken: string, password: string) => {
    const newConnection = await getConnection();
    const userRepository = newConnection.getRepository(User);
    const user = await userRepository.findOne({ where: { verification: verificationToken } });
    if (!user) {
      throw new Error('User not found');
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userRepository.update(
      { verification: verificationToken },
      { ...user, password: hashedPassword }
    );
    const updateUser = { email: user.email, id: user.id };
    const token = jwt.sign({ updateUser }, process.env.JWT_SECRET);

    return token;
  };
}
