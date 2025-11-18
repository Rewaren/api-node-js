// tests/api.spec.ts
import { test, expect } from '@playwright/test';
import {StatusCodes} from "http-status-codes";

let baseURL: string = 'http://localhost:3000/users';


test.describe('User management API', () => {


    test('find user: should return a user by ID', async ({ request }) => {
        const createResponse = await request.post(`${baseURL}`);
        const createdUser = await createResponse.json();
        const userId = createdUser.id;

        const getResponse = await request.get((baseURL + '/' + userId));
        expect.soft(getResponse.status()).toBe(StatusCodes.OK);

        const getResponseBody = await getResponse.json();
        expect.soft(getResponseBody.id).toBe(userId);
    });

    test('find user: should return 404 if user not found', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        const responseBody = await response.json()
        const userId = responseBody.id
        const delResponse = await request.delete(baseURL + '/' + userId);
        expect.soft(delResponse.status()).toBe(StatusCodes.OK);
        const getResponse = await request.get(baseURL + '/' + userId);
        expect.soft(getResponse.status()).toBe(StatusCodes.NOT_FOUND);
    });

    test('create user: should add a new user', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        expect.soft(response.status()).toBe(StatusCodes.CREATED);
        const responseBody = await response.json()
        expect.soft(responseBody.id).toBeDefined();
        expect.soft(responseBody.name).toBeDefined();
        expect.soft(responseBody.email).toBeDefined();
        expect.soft(responseBody.phone).toBeDefined();
        //console.log(responseBody)
    });

    test('delete user: should delete a user by ID', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        const responseBody = await response.json()
        const userId = responseBody.id
        //console.log(responseBody)
        const deleteResponse = await request.delete(baseURL + '/' + userId);
        expect.soft(deleteResponse.status()).toBe(StatusCodes.OK);
        const deleteResponseBody = await deleteResponse.json()
        expect.soft(deleteResponseBody[0].id).toBe(userId);
        //console.log(delResponseBody)
    });

    test('delete user: should return 404 if user not found', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        const responseBody = await response.json()
        const userId = responseBody.id
        const deleteResponse = await request.delete(baseURL + '/' + userId);
        expect.soft(deleteResponse.status()).toBe(StatusCodes.OK);
        const deleteAgainResponse = await request.delete(baseURL + '/' + userId);
        expect.soft(deleteAgainResponse.status()).toBe(StatusCodes.NOT_FOUND);
    });

});
