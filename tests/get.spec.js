const { test, expect } = require('@playwright/test');

test('GET  API Call', async ({ request }) => {
  // 1. Send the GET request
  const response = await request.get('https://jsonplaceholder.typicode.com/users/1');

  // 2. Assert the status is 200 (OK)
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // 3. Parse the JSON body
  const user = await response.json();

  // 4. Validate the data structure
  console.log('Retrieved User:', user.name);
 
  expect(user).toMatchObject({
    id: 1,
    username: 'Bret',
    email: 'Sincere@april.biz'
  });
});