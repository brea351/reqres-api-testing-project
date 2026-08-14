import { test, expect } from '@playwright/test';
import { ReqResApi } from '../../utils/api-client.js';
import fs from 'fs';

const testData = JSON.parse(
  fs.readFileSync('./test-data/users.json', 'utf-8')
);

test.describe('POST Create User API', () => {

  test('should create a user successfully', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.createUser(testData.validUser);

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('name');
    expect(responseBody).toHaveProperty('job');
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('createdAt');

    expect(responseBody.name).toBe(testData.validUser.name);
    expect(responseBody.job).toBe(testData.validUser.job);
    expect(responseBody.id).toBeTruthy();
    expect(responseBody.createdAt).toBeTruthy();
  });


  test('should create a user with a different job successfully', async ({ request }) => {
    const api = new ReqResApi(request);

    const userData = {
      name: 'Test User',
      job: 'Data QA Engineer'
    };

    const response = await api.createUser(userData);

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.name).toBe(userData.name);
    expect(responseBody.job).toBe(userData.job);
    expect(responseBody.id).toBeTruthy();
    expect(responseBody.createdAt).toBeTruthy();
  });


  test('should create a user with an empty name field', async ({ request }) => {
    const api = new ReqResApi(request);

    const userData = {
      name: '',
      job: 'QA Engineer'
    };

    const response = await api.createUser(userData);

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.name).toBe('');
    expect(responseBody.job).toBe(userData.job);
    expect(responseBody.id).toBeTruthy();
  });

});