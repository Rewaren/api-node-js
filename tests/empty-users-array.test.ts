import { test, expect } from '@playwright/test';
import {StatusCodes} from "http-status-codes";
let baseURL: string = 'http://localhost:3000/users';

test.describe('User management API: empty array when no users', () => {

    test('all users: should return empty array when no users', async ({ request }) => {
        const existingUsers = await request.get(`${baseURL}`);
        const users = await existingUsers.json();

        for (const user of users) {
            await request.delete(`${baseURL}/${user.id}`);
        }

        const response = await request.get(`${baseURL}`);
        expect(response.status()).toBe(StatusCodes.OK);
        const responseBody = await response.text()
        expect(responseBody).toBe('[]');
    });
});