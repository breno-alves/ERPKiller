import connection from '@shared/utils/tests/connection';

import AppError from '@shared/errors/AppError';

import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import CreateUserService from '@modules/users/services/CreateUserService';

describe('Users', () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  describe('CreateUser', () => {
    it('Should be able to create a new user', async () => {
      const usersRepository = new UsersRepository();
      const hashProvider = new HashProvider();

      const createUser = new CreateUserService(usersRepository, hashProvider);

      const user = await createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123123',
        birthday: new Date(1995, 10, 10),
        gender: 'male',
      });

      expect(user).toHaveProperty('id');
    });

    it('Should not be able to create a new user with a used email', async () => {
      const usersRepository = new UsersRepository();
      const hashProvider = new HashProvider();

      const createUser = new CreateUserService(usersRepository, hashProvider);

      await createUser.execute({
        name: 'John Doe',
        email: 'johndoe2@example.com',
        password: '123123',
        birthday: new Date(1995, 10, 10),
        gender: 'male',
      });

      expect(
        createUser.execute({
          name: 'John Doe',
          email: 'johndoe2@example.com',
          password: '123123',
          birthday: new Date(1995, 10, 10),
          gender: 'male',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });
  });
});
