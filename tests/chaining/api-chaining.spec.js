import { test, expect } from '@playwright/test';
import { ReqResApi } from '../../utils/api-client.js';

test.describe('API Chaining Workflow', () => {

  test('should create a user and use the returned ID to update the user', async ({ request }) => {
    const api = new ReqResApi(request);

    // Step 1: Create user
    const createResponse = await api.createUser({
      name: 'Tosin Williams',
      job: 'QA Engineer'
    });

    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();

    expect(createdUser).toHaveProperty('id');
    expect(createdUser).toHaveProperty('name');
    expect(createdUser).toHaveProperty('job');

    // Capture ID from the create response
    const userId = createdUser.id;

    expect(userId).toBeTruthy();

    // Step 2: Use the returned ID in the update request
    const updateResponse = await api.updateUser(userId, {
      name: createdUser.name,
      job: 'Senior QA Engineer'
    });

    expect(updateResponse.status()).toBe(200);

    const updatedUser = await updateResponse.json();

    expect(updatedUser.name).toBe(createdUser.name);
    expect(updatedUser.job).toBe('Senior QA Engineer');
    expect(updatedUser).toHaveProperty('updatedAt');
  });


  test('should create a user and use the returned ID to partially update the user', async ({ request }) => {
    const api = new ReqResApi(request);

    // Step 1: Create user
    const createResponse = await api.createUser({
      name: 'Tosin',
      job: 'QA Tester'
    });

    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();

    const userId = createdUser.id;

    expect(userId).toBeTruthy();

    // Step 2: Use the returned ID for PATCH
    const patchResponse = await api.patchUser(userId, {
      job: 'Data QA Engineer'
    });

    expect(patchResponse.status()).toBe(200);

    const patchedUser = await patchResponse.json();

    expect(patchedUser.job).toBe('Data QA Engineer');
    expect(patchedUser).toHaveProperty('updatedAt');
  });


  test('should create a user and use the returned ID to delete the user', async ({ request }) => {
    const api = new ReqResApi(request);

    // Step 1: Create user
    const createResponse = await api.createUser({
      name: 'Tosin',
      job: 'QA Engineer'
    });

    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();

    const userId = createdUser.id;

    expect(userId).toBeTruthy();

    // Step 2: Delete using the ID returned from creation
    const deleteResponse = await api.deleteUser(userId);

    expect(deleteResponse.status()).toBe(204);

    // A successful DELETE should not return a response body
    expect(await deleteResponse.text()).toBe('');
  });


  test('should chain create, update and delete operations using the same returned ID', async ({ request }) => {
    const api = new ReqResApi(request);

    // Step 1: Create
    const createResponse = await api.createUser({
      name: 'Tosin Williams',
      job: 'Software QA Engineer'
    });

    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();

    const userId = createdUser.id;

    expect(userId).toBeTruthy();

    // Step 2: Update using the ID from Step 1
    const updateResponse = await api.updateUser(userId, {
      name: createdUser.name,
      job: 'Data QA Engineer'
    });

    expect(updateResponse.status()).toBe(200);

    const updatedUser = await updateResponse.json();

    expect(updatedUser.job).toBe('Data QA Engineer');
    expect(updatedUser).toHaveProperty('updatedAt');

    // Step 3: Delete using the same ID
    const deleteResponse = await api.deleteUser(userId);

    expect(deleteResponse.status()).toBe(204);
    expect(await deleteResponse.text()).toBe('');
  });

});