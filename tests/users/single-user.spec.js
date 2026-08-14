import { test, expect } from '@playwright/test';
import { ReqResApi } from '../../utils/api-client.js';
import fs from 'fs';

const testData = JSON.parse(
  fs.readFileSync('./test-data/users.json', 'utf-8')
);

test.describe('GET Single User API', () => {

  test('should retrieve a single user successfully', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUser(testData.userIds.valid);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toHaveProperty('id');
    expect(responseBody.data).toHaveProperty('email');
    expect(responseBody.data).toHaveProperty('first_name');
    expect(responseBody.data).toHaveProperty('last_name');
    expect(responseBody.data).toHaveProperty('avatar');

    expect(responseBody.data.id).toBe(testData.userIds.valid);
  });


  test('should retrieve another valid user successfully', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUser(testData.userIds.anotherValid);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.data.id).toBe(testData.userIds.anotherValid);
    expect(responseBody.data.email).toContain('@');
  });


  test('should return 404 for a non-existent user', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUser(testData.userIds.invalid);

    expect(response.status()).toBe(404);
  });

});