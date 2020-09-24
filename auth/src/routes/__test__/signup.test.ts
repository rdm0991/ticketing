import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'tssdfdasdm', password: 'password' })
    .expect(400);
});

it('returns a 400 with invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'ps' })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app).post('/api/users/signup').send({ email: '' }).expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({ password: 'adfdsfsd' })
    .expect(400);
});

it('disallows duplicate email signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test1@test.com', password: 'password' })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test1@test.com', password: 'password' })
    .expect(400);
});

it('Sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
