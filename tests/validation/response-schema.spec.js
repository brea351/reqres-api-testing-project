import { test, expect } from '@playwright/test';
import { ReqResApi } from '../../utils/api-client.js';

test.describe('API Response and Schema Validation', () => {

  test('should validate the users list response structure', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUsers(2);

    expect(response.status()).toBe(200);

    const body = await response.json();

    // Top-level response validation
    expect(body).toHaveProperty('page');
    expect(body).toHaveProperty('per_page');
    expect(body).toHaveProperty('total');
    expect(body).toHaveProperty('total_pages');
    expect(body).toHaveProperty('data');

    // Data type validation
    expect(typeof body.page).toBe('number');
    expect(typeof body.per_page).toBe('number');
    expect(typeof body.total).toBe('number');
    expect(typeof body.total_pages).toBe('number');
    expect(Array.isArray(body.data)).toBe(true);
  });


  test('should validate the structure of each user object', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUsers(2);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data.length).toBeGreaterThan(0);

    for (const user of body.data) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('first_name');
      expect(user).toHaveProperty('last_name');
      expect(user).toHaveProperty('avatar');

      expect(typeof user.id).toBe('number');
      expect(typeof user.email).toBe('string');
      expect(typeof user.first_name).toBe('string');
      expect(typeof user.last_name).toBe('string');
      expect(typeof user.avatar).toBe('string');
    }
  });


  test('should validate a single user response schema', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUser(2);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('data');

    const user = body.data;

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('first_name');
    expect(user).toHaveProperty('last_name');
    expect(user).toHaveProperty('avatar');

    expect(typeof user.id).toBe('number');
    expect(typeof user.email).toBe('string');
    expect(typeof user.first_name).toBe('string');
    expect(typeof user.last_name).toBe('string');
    expect(typeof user.avatar).toBe('string');
  });


  test('should validate created user response schema', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.createUser({
      name: 'Tosin Williams',
      job: 'QA Engineer'
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('job');
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');

    expect(typeof body.name).toBe('string');
    expect(typeof body.job).toBe('string');
    expect(typeof body.id).toBe('string');
    expect(typeof body.createdAt).toBe('string');
  });


  test('should validate updated user response schema', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.updateUser(2, {
      name: 'Tosin Williams',
      job: 'Senior QA Engineer'
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('job');
    expect(body).toHaveProperty('updatedAt');

    expect(typeof body.name).toBe('string');
    expect(typeof body.job).toBe('string');
    expect(typeof body.updatedAt).toBe('string');
  });


  test('should validate partially updated user response schema', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.patchUser(2, {
      job: 'Data QA Engineer'
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('job');
    expect(body).toHaveProperty('updatedAt');

    expect(typeof body.job).toBe('string');
    expect(typeof body.updatedAt).toBe('string');

    expect(body.job).toBe('Data QA Engineer');
  });


  test('should validate successful login response schema', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.login({
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });


  test('should validate successful registration response schema', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.register({
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('token');

    expect(typeof body.id).toBe('number');
    expect(typeof body.token).toBe('string');

    expect(body.token.length).toBeGreaterThan(0);
  });


  test('should validate error response schema for invalid login', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.login({
      email: 'invalid@example.com',
      password: 'pistol'
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body).toHaveProperty('error');
    expect(typeof body.error).toBe('string');
    expect(body.error.length).toBeGreaterThan(0);
  });


  test('should validate error response schema for invalid registration', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.register({
      email: 'invalid@example.com'
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body).toHaveProperty('error');
    expect(typeof body.error).toBe('string');
    expect(body.error.length).toBeGreaterThan(0);
  });

});