import { Router } from 'express';
// import { getConnection } from 'typeorm';
// eslint-disable-next-line import/no-named-as-default
import userController from '../../controllers/user.controller';
import IsExist from '../../middleware/validation';
import { myPassport } from '../../middleware/passport.middleware';
// import User from '../../entities/User';
import { authenticate } from '../../middleware/auth.middleware';

const router: Router = Router();

const isExist = new IsExist();

router.post(
  '/register',
  isExist.userValidation,
  myPassport.authenticate('signup', { session: false }),
  userController.registerUser.bind(userController)
);

router.post(
  '/login',
  isExist.userValidation,
  authenticate('login', { session: false }),
  userController.loginUser.bind(userController)
);

router.delete(
  '/logout',
  myPassport.authenticate('jwt', { session: false }),
  userController.logoutUser.bind(userController)
);

router.post(
  '/reload',
  // authenticate('reload', { session: false }),
  userController.forgetPasswordUser.bind(userController)
);

router.post('/verify/:verificationToken', userController.recoveryPassword.bind(userController));

// router.get('/verify/:verificationToken', asyncWrapper(verificationTokenController));
//

// TEMP!!!!!!!!!!

// router.delete('/', (req, res) => {
//   async function remove(req: any, res: any, id: string) {
//     const newConnection = getConnection();
//     const todoRepository = newConnection.getRepository(User);

//     const removeTodo = await todoRepository.delete(id);
//     console.log(removeTodo);
//     res.json(removeTodo);
//   }
//   remove(req, res, '5');
// });

// router.get('/', (req, res) => {
//   async function show(req: any, res: any) {
//     const newConnection = getConnection();
//     const todoRepository = newConnection.getRepository(User);

//     const removeTodo = await todoRepository.find();
//     console.log(removeTodo);
//     res.json(removeTodo);
//   }
//   show(req, res);
// });

// TEMP!!!!!!!!!!

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
// router.post('/register', async (_: Request, res: Response) => {
//   res.send('Add registration logic there');
// });

export default router;
