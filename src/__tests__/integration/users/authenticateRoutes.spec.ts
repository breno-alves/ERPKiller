import app from '@shared/infra/http/server';
import connection from '@shared/utils/tests/connection';
import request from 'supertest';

import { createUser } from '@shared/utils/tests/testHelper';

describe.only('Authentication', () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  describe('Authenticate', () => {
    it('Should receive token when trying to authenticate', async () => {
      await createUser({
        name: 'Test Example',
        email: 'test@erpkiller.com',
        birthday: new Date(1995, 10, 10),
        gender: 'male',
        password: 'test123',
      });

      const response = await request(app).post('/sessions').send({
        email: 'test@erpkiller.com',
        password: 'test123',
      });

      const model = response.body;
      expect(1 + 1).toEqual(2);
      expect(typeof model).toBe('object');
      expect(Object.keys(model)).toEqual(
        expect.arrayContaining([
          'id',
          'email',
          'name',
          'avatarUrl',
          'birthday',
          'gender',
          'token',
          'created_at',
          'updated_at',
        ]),
      );
    });
  });
});
