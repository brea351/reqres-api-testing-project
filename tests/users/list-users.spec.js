import { test, expect } from '@playwright/test';
import { ReqResApi } from '../../utils/api-client.js';

test.describe('GET Users API', () => {

  test('should retrieve the list of users successfully', async ({ request }) => {

    const api = new ReqResApi(request);

    const response = await api.getUsers(2);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('page');
    expect(responseBody).toHaveProperty('per_page');
    expect(responseBody).toHaveProperty('total');
    expect(responseBody).toHaveProperty('total_pages');
    expect(responseBody).toHaveProperty('data');

    expect(responseBody.page).toBe(2);
    expect(Array.isArray(responseBody.data)).toBe(true);
    expect(responseBody.data.length).toBeGreaterThan(0);

    for (const user of responseBody.data) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('first_name');
      expect(user).toHaveProperty('last_name');
      expect(user).toHaveProperty('avatar');
    }
  });

});