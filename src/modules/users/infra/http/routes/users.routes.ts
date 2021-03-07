import { Router } from 'express';

import UsersController from '@modules/users/infra/controller/UsersController';

import UsersValidator from '../validators/UsersValidator';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const UsersRouter = Router();

// Controllers
const usersController = new UsersController();

// Validators
const usersValidator = new UsersValidator();

UsersRouter.post('/', usersValidator.create, usersController.create);

UsersRouter.get('/', ensureAuthenticated, usersController.index);

export default UsersRouter;
