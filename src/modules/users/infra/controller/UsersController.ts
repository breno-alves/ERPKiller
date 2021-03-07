import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import UsersRepository from '../typeorm/repositories/UsersRepository';

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

  public async index(request: Request, response: Response): Promise<Response> {
    const { id, email } = request.body;

    if (!id && !email) {
      throw new AppError('Must provide id or email');
    }

    const usersRepository = new UsersRepository();

    const user = await usersRepository.find({ id, email });

    return response.json({ ...user, password: undefined });
  }
}

export default UsersController;
