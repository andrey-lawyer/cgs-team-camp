// eslint-disable-next-line import/no-extraneous-dependencies
import nodemailer from 'nodemailer';

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'real_vostok@meta.ua',
    pass: process.env.PASSWORD
  }
};

// eslint-disable-next-line prettier/prettier
export const transporter = nodemailer.createTransport(config);
