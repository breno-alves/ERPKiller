import { Router } from 'express';

import UsersController from '@modules/users/infra/controller/UsersController';

import UsersValidator from '../validators/UsersValidator';

const UsersRouter = Router();

// Controllers
const usersController = new UsersController();

// Validators
const usersValidator = new UsersValidator();

UsersRouter.post('/', usersValidator.create, usersController.create);

export default UsersRouter;
