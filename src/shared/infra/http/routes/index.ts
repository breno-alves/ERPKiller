import { Router } from 'express';

import SessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import UsersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/sessions', SessionRouter);
routes.use('/users', UsersRouter);

export default routes;
