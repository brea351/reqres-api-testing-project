import { test, expect } from '@playwright/test';
import { ReqResApi } from '../../utils/api-client.js';
import fs from 'fs';

const testData = JSON.parse(
  fs.readFileSync('./test-data/users.json', 'utf-8')
);

test.describe('PATCH Update User API', () => {

  test('should partially update a user successfully', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.patchUser(
      testData.userIds.valid,
      testData.patchUser
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('name');
    expect(responseBody).toHaveProperty('updatedAt');

    expect(responseBody.name).toBe(testData.patchUser.name);
    expect(responseBody.updatedAt).toBeTruthy();
  });


  test('should update only the job field successfully', async ({ request }) => {
    const api = new ReqResApi(request);

    const userData = {
      job: 'Data QA Engineer'
    };

    const response = await api.patchUser(
      testData.userIds.anotherValid,
      userData
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('job');
    expect(responseBody).toHaveProperty('updatedAt');

    expect(responseBody.job).toBe(userData.job);
    expect(responseBody.updatedAt).toBeTruthy();
  });


  test('should partially update a user with an empty value', async ({ request }) => {
    const api = new ReqResApi(request);

    const userData = {
      name: ''
    };

    const response = await api.patchUser(
      testData.userIds.valid,
      userData
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('name');
    expect(responseBody).toHaveProperty('updatedAt');

    expect(responseBody.name).toBe('');
    expect(responseBody.updatedAt).toBeTruthy();
  });

});