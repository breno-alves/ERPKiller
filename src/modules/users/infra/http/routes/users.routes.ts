import { Router } from 'express';

import UsersController from '@modules/users/infra/controller/UsersController';
import UsersValidator from '../validators/UsersValidator';

const usersRouter = Router();

// Controllers
const usersController = new UsersController();

// Validators
const usersValidator = new UsersValidator();

usersRouter.post('/', usersValidator.create, usersController.create);

export default usersRouter;
