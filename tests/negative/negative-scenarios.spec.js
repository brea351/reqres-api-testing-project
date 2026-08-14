import { test, expect } from '@playwright/test';
import { ReqResApi } from '../../utils/api-client.js';

test.describe('Negative, Boundary and Validation Scenarios', () => {

  // =========================
  // GET USER - NEGATIVE
  // =========================

  test('should return 404 for user ID 0', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUser(0);

    expect(response.status()).toBe(404);
  });


  test('should return 404 for a negative user ID', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUser(-1);

    expect(response.status()).toBe(404);
  });


  test('should return 404 for a very large user ID', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUser(999999);

    expect(response.status()).toBe(404);
  });


  test('should return 404 for a non-numeric user ID', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUser('invalid');

    expect(response.status()).toBe(404);
  });


  // =========================
  // PAGINATION - BOUNDARY
  // =========================

  test('should normalize page zero to the first page', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUsers(0);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.page).toBe(1);
    expect(responseBody.data).toBeInstanceOf(Array);
    expect(responseBody.data.length).toBeGreaterThan(0);
  });


  test('should handle a negative page number', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUsers(-1);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.page).toBe(-1);
    expect(responseBody.data).toBeInstanceOf(Array);
  });


  test('should return an empty data array for a very large page number', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUsers(999999);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.page).toBe(999999);
    expect(responseBody.data).toBeInstanceOf(Array);
    expect(responseBody.data.length).toBe(0);
  });


  test('should handle a non-numeric page value', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUsers('invalid');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('page');
    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toBeInstanceOf(Array);
  });


  // =========================
  // LOGIN - NEGATIVE
  // =========================

  test('should reject login with an invalid email', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.login({
      email: 'invalid@example.com',
      password: 'pistol'
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should process login request with an invalid password', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.login({
      email: 'eve.holt@reqres.in',
      password: 'wrong-password'
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('token');
    expect(responseBody.token).toBeTruthy();
  });


  test('should reject login with an empty email', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.login({
      email: '',
      password: 'pistol'
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject login with an empty password', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.login({
      email: 'eve.holt@reqres.in',
      password: ''
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  // =========================
  // REGISTRATION - NEGATIVE
  // =========================

  test('should reject registration with an invalid email', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.register({
      email: 'invalid@example.com'
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject registration with an empty password', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.register({
      email: 'eve.holt@reqres.in',
      password: ''
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject registration when both credentials are empty', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.register({
      email: '',
      password: ''
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });

});