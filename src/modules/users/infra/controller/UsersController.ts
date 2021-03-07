import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, birthday, gender, avatarUrl, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      birthday,
      gender,
      avatarUrl,
      password,
    });

    return response.json({ ...user, password: undefined });
  }
}

export default UsersController;
