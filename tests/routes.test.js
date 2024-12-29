import { test } from 'node:test';
import assert from 'assert';
import supertest from 'supertest';
import app from '../index.js'; 

const request = supertest(app);
let createdUserId;

let uniqueUsername = 'newuser_' + Date.now();

test('GET /api/users - success', async () => {
    const response = await request.get('/api/users');
    assert.strictEqual(response.status, 200);
    assert(Array.isArray(response.body));
});

test('POST /api/users/register - success', async () => {
    const newUser = {
        username: uniqueUsername,
        password: 'password123'
    };
    const response = await request.post('/api/users/register').send(newUser);
    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.username, uniqueUsername);
    createdUserId = response.body.id; // Save the ID for future tests
});


test('POST /api/users/register - validation error', async () => {
    const newUser = {
        username: 'nu',
        password: '123'
    };
    const response = await request.post('/api/users/register').send(newUser);
    assert.strictEqual(response.status, 400);
    console.log(response.body.error); // Log the actual error message
    assert(response.body.error.includes('length must be at least 3 characters long'));
});

test('GET /api/users/:id - success', async () => {
    if (!createdUserId) {
        throw new Error('User ID is not set. Ensure user registration test runs first.');
    }
    const response = await request.get(`/api/users/${createdUserId}`);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.id, createdUserId);
});

test('GET /api/users/:id - user not found', async () => {
    const response = await request.get('/api/users/nonexistent');
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.text, 'User not found');
});

test('PUT /api/users/:id - success', async () => {
    if (!createdUserId) {
        throw new Error('User ID is not set. Ensure user registration test runs first.');
    }
    const updatedUser = {
        username: 'updateduser',
        password: 'newpassword123'
    };
    const response = await request.put(`/api/users/${createdUserId}`).send(updatedUser);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.username, 'updateduser');
});

test('PUT /api/users/:id - user not found', async () => {
    const updatedUser = {
        username: 'updateduser',
        password: 'newpassword123'
    };
    const response = await request.put('/api/users/nonexistent').send(updatedUser);
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.text, 'User not found');
});

test('DELETE /api/users/:id - success', async () => {
    if (!createdUserId) {
        throw new Error('User ID is not set. Ensure user registration test runs first.');
    }
    const response = await request.delete(`/api/users/${createdUserId}`);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.id, createdUserId);
});
test('DELETE /api/users/:id - user not found', async () => {
    const response = await request.delete('/api/users/nonexistent');
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.text, 'User not found');
});

test('PUT /api/users/:id/:role - user not found', async () => {
    const response = await request.put('/api/users/nonexistent/admin');
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.text, 'User not found');
});

