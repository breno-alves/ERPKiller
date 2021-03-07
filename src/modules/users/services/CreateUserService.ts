import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

import User from '../infra/typeorm/entities/User';

@injectable()
class CreateUserService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('HashProvider')
    hashProvider: IHashProvider,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    name,
    email,
    birthday,
    gender,
    avatarUrl,
    password,
  }: ICreateUserDTO): Promise<User> {
    const checkUsersExists = await this.usersRepository.find({ email });

    if (checkUsersExists) {
      throw new AppError('Email adress already taken');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      birthday,
      gender,
      avatarUrl,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
