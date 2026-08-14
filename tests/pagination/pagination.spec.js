import { test, expect } from '@playwright/test';
import { ReqResApi } from '../../utils/api-client.js';

test.describe('Users Pagination API', () => {

  test('should retrieve the first page successfully', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUsers(1);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.page).toBe(1);
    expect(responseBody.data).toBeInstanceOf(Array);
    expect(responseBody.data.length).toBeGreaterThan(0);
  });


  test('should retrieve the second page successfully', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUsers(2);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.page).toBe(2);
    expect(responseBody.data).toBeInstanceOf(Array);
    expect(responseBody.data.length).toBeGreaterThan(0);
  });


  test('should validate pagination metadata', async ({ request }) => {
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
    expect(responseBody.per_page).toBeGreaterThan(0);
    expect(responseBody.total).toBeGreaterThan(0);
    expect(responseBody.total_pages).toBeGreaterThan(0);
  });


  test('should return users with valid IDs on page 2', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUsers(2);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    for (const user of responseBody.data) {
      expect(user.id).toBeGreaterThan(0);
      expect(Number.isInteger(user.id)).toBe(true);
    }
  });


  test('should return users with valid email addresses', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUsers(2);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    for (const user of responseBody.data) {
      expect(user.email).toContain('@');
      expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    }
  });


  test('should return users with required profile fields', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUsers(2);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    for (const user of responseBody.data) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('first_name');
      expect(user).toHaveProperty('last_name');
      expect(user).toHaveProperty('avatar');
    }
  });


  test('should return an empty data array for a page beyond available pages', async ({ request }) => {
    const api = new ReqResApi(request);

    const response = await api.getUsers(999);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.page).toBe(999);
    expect(responseBody.data).toBeInstanceOf(Array);
    expect(responseBody.data.length).toBe(0);
  });


  test('should return a consistent number of users per page', async ({ request }) => {
    const api = new ReqResApi(request);

    const firstPageResponse = await api.getUsers(1);
    const secondPageResponse = await api.getUsers(2);

    expect(firstPageResponse.status()).toBe(200);
    expect(secondPageResponse.status()).toBe(200);

    const firstPage = await firstPageResponse.json();
    const secondPage = await secondPageResponse.json();

    expect(firstPage.data.length).toBe(firstPage.per_page);
    expect(secondPage.data.length).toBe(secondPage.per_page);
  });

});