// eslint-disable-next-line import/no-extraneous-dependencies
import passport from 'passport';
// eslint-disable-next-line import/no-extraneous-dependencies
import passportJWT from 'passport-jwt';
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';

import { Strategy as LocalStrategy } from 'passport-local';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Strategy as AnonymousStrategy } from 'passport-anonymous';

import { getConnection } from 'typeorm';
import User from '../entities/User';
import { ErrorForbidden, ErrorUnauthorized } from '../helpers/errors';

export const myPassport = new passport.Passport();

const { Strategy, ExtractJwt } = passportJWT;

myPassport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      const newConnection = await getConnection();
      const userRepository = newConnection.getRepository(User);
      try {
        const user = await userRepository.findOne({ where: { email } });
        if (user) {
          throw new ErrorForbidden('User already registered');
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userRepository.save({ email, password: hashedPassword });

        return done(null, newUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

myPassport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      const newConnection = await getConnection();
      const userRepository = newConnection.getRepository(User);

      try {
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new ErrorUnauthorized('Password is wrong');
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// myPassport.use(
//   'reload',
//   new LocalStrategy(
//     {
//       usernameField: 'email'
//     },
//     async (email, _, done) => {
//       const newConnection = await getConnection();
//       const userRepository = newConnection.getRepository(User);

//       try {
//         const user = await userRepository.findOne({ where: { email } });
//         if (!user) {
//           return done(null, false, { message: 'User not found' });
//         }
//         //     async updateTodo(todo: ITodo, todoId: string) {
//         // const newConnection = getConnection();
//         // const todoRepository = newConnection.getRepository(Todo);

//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

myPassport.use(
  new Strategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

myPassport.use(new AnonymousStrategy());
