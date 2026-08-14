import { test, expect } from '@playwright/test';
import { ReqResApi } from '../../utils/api-client.js';
import fs from 'fs';

const testData = JSON.parse(
  fs.readFileSync('./test-data/users.json', 'utf-8')
);

test.describe('PUT Update User API', () => {

  test('should update a user successfully', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.updateUser(
      testData.userIds.valid,
      testData.updatedUser
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('name');
    expect(responseBody).toHaveProperty('job');
    expect(responseBody).toHaveProperty('updatedAt');

    expect(responseBody.name).toBe(testData.updatedUser.name);
    expect(responseBody.job).toBe(testData.updatedUser.job);
    expect(responseBody.updatedAt).toBeTruthy();
  });


  test('should update a user with a different job', async ({ request }) => {
    const api = new ReqResApi(request);

    const userData = {
      name: 'Updated QA User',
      job: 'Senior Data QA Engineer'
    };

    const response = await api.updateUser(
      testData.userIds.anotherValid,
      userData
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.name).toBe(userData.name);
    expect(responseBody.job).toBe(userData.job);
    expect(responseBody.updatedAt).toBeTruthy();
  });


  test('should update a user with an empty job field', async ({ request }) => {
    const api = new ReqResApi(request);

    const userData = {
      name: 'QA Test User',
      job: ''
    };

    const response = await api.updateUser(
      testData.userIds.valid,
      userData
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.name).toBe(userData.name);
    expect(responseBody.job).toBe('');
    expect(responseBody.updatedAt).toBeTruthy();
  });

});