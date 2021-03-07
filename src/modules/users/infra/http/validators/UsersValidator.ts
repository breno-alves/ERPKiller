import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';

import * as Yup from 'yup';

class UsersValidator {
  public async create(
    request: Request,
    _: Response,
    next: NextFunction,
  ): Promise<void> {
    const { name, email, birthday, gender, avatarUrl, password } = request.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      birthday: Yup.date().required(),
      gender: Yup.string()
        .required()
        .test(value => ['female', 'male'].includes(value)),
      avatarUrl: Yup.string().notRequired(),
      password: Yup.string().min(6).max(32).required(),
    });

    try {
      await schema.validate({
        name,
        email,
        birthday,
        gender,
        avatarUrl,
        password,
      });
    } catch (err) {
      throw new AppError(err, 422);
    }

    next();
  }
}

export default UsersValidator;
