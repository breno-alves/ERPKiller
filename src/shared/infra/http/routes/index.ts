import { Router } from 'express';

import UsersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/users', UsersRouter);

export default routes;
