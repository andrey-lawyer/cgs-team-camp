import { Router } from 'express';
import userController from '../../controllers/user.controller';
import IsExist from '../../middleware/validation';

const isExist = new IsExist();

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
// router.post('/register', async (_: Request, res: Response) => {
//   res.send('Add registration logic there');
// });
router.post('/register', isExist.userValidation, userController.registerUser.bind(userController));

export default router;
