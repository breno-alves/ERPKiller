import ICreateUser from '@modules/users/dtos/ICreateUserDTO';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IAuthenticateUse {
  user: User;
  token: string;
}

export const getDateNow = (): string => {
  const date = new Date(Date.now());

  const formatedDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  return formatedDate;
};

export const createUser = async ({
  name,
  email,
  birthday,
  gender,
  avatarUrl,
  password,
}: ICreateUser): Promise<User> => {
  const usersRepository = new UsersRepository();
  const hashProvider = new HashProvider();

  const hashedPassword = await hashProvider.generateHash(password);

  const user = await usersRepository.create({
    name,
    email,
    birthday,
    gender,
    avatarUrl,
    password: hashedPassword,
  });

  return user;
};

export const createUserAndLogin = async ({
  name,
  email,
  birthday,
  gender,
  avatarUrl,
  password,
}: ICreateUser): Promise<IAuthenticateUse> => {
  await createUser({
    name,
    email,
    birthday,
    gender,
    avatarUrl,
    password,
  });

  const usersRepository = new UsersRepository();
  const hashProvider = new HashProvider();

  const authenticateUserService = new AuthenticateUserService(
    usersRepository,
    hashProvider,
  );

  const { token, user } = await authenticateUserService.execute({
    email,
    password,
  });

  return { token, user };
};
