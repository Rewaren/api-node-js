// tests/api.spec.ts
import { test, expect } from '@playwright/test';
import {StatusCodes} from "http-status-codes";

let baseURL: string = 'http://localhost:3000/users';


test.describe('User management API', () => {

    test.beforeEach('get and delete all existing users', async ({request}) => {
        //get all users
        const responseAllUsers = await request.get(`${baseURL}`);
        const responseUsers = await responseAllUsers.json();

        //get users' Ids
        let userIds: number[] = [];
        const numberOfObjects = responseUsers.length;
        for (let i = 0; i < numberOfObjects; i++) {
            let userId = responseUsers[i].id;
            userIds.push(userId);
        }

        //delete all users by id
        for(let i =0; i < numberOfObjects; i++){
            let response = await request.delete(`${baseURL}/${userIds[i]}`);
            expect.soft(response.status()).toBe(StatusCodes.OK);
        }

        //check all users are deleted
        const response = await request.get(`${baseURL}`);
        expect.soft(response.status()).toBe(StatusCodes.OK);
        const responseBody = await response.text()
        expect.soft(responseBody).toBe('[]');

    })

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

    test('get user ID information', async ({ request }) => {
        const response1 = await request.post(`${baseURL}`);
        const response2 = await request.post(`${baseURL}`);
        const responseAllUsers = await request.get(`${baseURL}`);
        const responseUsers = await responseAllUsers.json();

        const numberOfObjects = responseUsers.length;
        console.log('numberOfObject is ' + numberOfObjects);

        let userIds: number[] = [];
        for (let i = 0; i < numberOfObjects; i++) {
            let userId = responseUsers[i].id;
            userIds.push(userId);
        }
        console.log('userIds are: ' + userIds);

        //delete userIds
        for(let i =0; i < numberOfObjects; i++){
            let response = await request.delete(`${baseURL}/${userIds[i]}`);
            expect.soft(response.status()).toBe(StatusCodes.OK);
        }
    });

});
