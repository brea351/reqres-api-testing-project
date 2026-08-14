import { test, expect } from '@playwright/test';
import { ReqResApi } from '../../utils/api-client.js';
import fs from 'fs';

const testData = JSON.parse(
  fs.readFileSync('./test-data/users.json', 'utf-8')
);

test.describe('DELETE User API', () => {

  test('should delete a user successfully', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.deleteUser(testData.userIds.valid);

    expect(response.status()).toBe(204);
  });


  test('should delete another user successfully', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.deleteUser(testData.userIds.anotherValid);

    expect(response.status()).toBe(204);
  });


  test('should return 204 when deleting a non-existent user', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.deleteUser(testData.userIds.invalid);

    expect(response.status()).toBe(204);
  });


  test('should return an empty response body after deletion', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.deleteUser(testData.userIds.valid);

    expect(response.status()).toBe(204);

    const responseBody = await response.text();

    expect(responseBody).toBe('');
  });

});