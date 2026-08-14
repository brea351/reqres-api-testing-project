import { test, expect } from '@playwright/test';
import { ReqResApi } from '../../utils/api-client.js';
import fs from 'fs';

const testData = JSON.parse(
  fs.readFileSync('./test-data/users.json', 'utf-8')
);

test.describe('POST Registration API', () => {

  test('should register successfully with valid credentials', async ({ request }) => {
    const api = new ReqResApi(request);

    const validCredentials = {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    };

    const response = await api.register(validCredentials);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('token');

    expect(responseBody.id).toBeTruthy();
    expect(responseBody.token).toBeTruthy();
  });


  test('should return 400 when password is missing', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.register({
      email: 'eve.holt@reqres.in'
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should return 400 when email is missing', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.register({
      password: 'pistol'
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should return 400 when both email and password are missing', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.register({});

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });

});