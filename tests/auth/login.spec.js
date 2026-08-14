import { test, expect } from '@playwright/test';
import { ReqResApi } from '../../utils/api-client.js';
import fs from 'fs';

const testData = JSON.parse(
  fs.readFileSync('./test-data/users.json', 'utf-8')
);

test.describe('POST Login API', () => {

  test('should login successfully with valid credentials', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.login(testData.validLogin);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('token');
    expect(responseBody.token).toBeTruthy();
  });


  test('should return 400 when password is missing', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.login(testData.invalidLogin);

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should return 400 when email is missing', async ({ request }) => {
    const api = new ReqResApi(request);

    const credentials = {
      password: 'cityslicka'
    };

    const response = await api.login(credentials);

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should return 400 when both email and password are missing', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.login({});

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });

});