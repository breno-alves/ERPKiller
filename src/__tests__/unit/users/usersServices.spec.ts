import connection from '@shared/utils/tests/connection';

import AppError from '@shared/errors/AppError';

import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import CreateUserService from '@modules/users/services/CreateUserService';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

describe('Users', () => {
  let usersRepository: IUsersRepository;
  let hashProvider: IHashProvider;

  beforeAll(async () => {
    await connection.create();
    usersRepository = new UsersRepository();
    hashProvider = new HashProvider();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  describe('CreateUser', () => {
    it('Should be able to create a new user', async () => {
      const createUser = new CreateUserService(usersRepository, hashProvider);

      const user = await createUser.execute({
        name: 'John Doe',
        email: 'johndoe@erpkiller.com',
        password: '123123',
        birthday: new Date(1995, 10, 10),
        gender: 'male',
      });

      expect(typeof user).toBe('object');
      expect(Object.keys(user)).toEqual(
        expect.arrayContaining([
          'id',
          'email',
          'name',
          'avatarUrl',
          'birthday',
          'gender',
          'created_at',
          'updated_at',
        ]),
      );
    });

    it('Should not be able to create a new user with a used email', async () => {
      const createUser = new CreateUserService(usersRepository, hashProvider);

      await createUser.execute({
        name: 'John Doe',
        email: 'johndoe2@erpkiller.com',
        password: '123123',
        birthday: new Date(1995, 10, 10),
        gender: 'male',
      });

      expect(
        createUser.execute({
          name: 'John Doe',
          email: 'johndoe2@erpkiller.com',
          password: '123123',
          birthday: new Date(1995, 10, 10),
          gender: 'male',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });
  });
});
