import User from '@modules/users/infra/typeorm/entities/User';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindUserDTO from '../dtos/IFindUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  find(data: IFindUserDTO): Promise<User | undefined>;
  save(user: User): Promise<User>;
}

export default IUsersRepository;
