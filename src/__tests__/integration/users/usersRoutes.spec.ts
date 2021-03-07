import app from '@shared/infra/http/server';
import connection from '@shared/utils/tests/connection';
import request from 'supertest';

import { createUserAndLogin } from '@shared/utils/tests/testHelper';

describe.only('Users', () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  describe('CreateUser', () => {
    it('Should create a new user', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: 'Test Example',
          email: 'test@erpkiller.com',
          birthday: new Date(1995, 10, 10),
          gender: 'male',
          password: 'test123',
        });

      const model = response.body;
      expect(typeof model).toBe('object');
      expect(Object.keys(model)).toEqual(
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

    it('Should not create a user with duplicated email', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: 'Test Example',
          email: 'test@erpkiller.com',
          birthday: new Date(1995, 10, 10),
          gender: 'male',
          password: 'test123',
        });

      const model = response.body;
      expect(typeof model).toBe('object');
      expect(model.status).toEqual('error');
      expect(model.message).toEqual('Email adress already taken');
    });

    it('Should not create a new user and receive a validation error: missing email', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: 'Test Example',
          birthday: new Date(1995, 10, 10),
          gender: 'male',
          password: 'test123',
        });

      const model = response.body;
      expect(typeof model).toBe('object');
      expect(model.status).toBe('error');
      expect(model.message.message).toEqual('email is a required field');
    });
  });

  describe('IndexUser', () => {
    it('Should get users information by id', async () => {
      const creationAndLoginResponse = await createUserAndLogin({
        name: 'Test Example',
        email: 'test2@erpkiller.com',
        birthday: new Date(1995, 10, 10),
        gender: 'male',
        password: 'test123',
      });

      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${creationAndLoginResponse.token}`);

      const model = response.body;
      expect(typeof model).toBe('object');
      expect(Object.keys(model)).toEqual(
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
  });
});
