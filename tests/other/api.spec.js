const { test, expect } = require('@playwright/test');

test('should create a new person via API', async ({ request }) => {
  // 1. Define the payload
  const newUser = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    job: 'Software Engineer'
  };

  // 2. Send the POST request
  const response = await request.post('https://jsonplaceholder.typicode.com/users', {
    data: newUser
  });

  // 3. Validate the status code (201 is "Created")
  expect(response.status()).toBe(201);

  // 4. Parse the response body and validate the data
  const body = await response.json();
  console.log('Response Body:', body);

  expect(body.name).toBe('Jane Doe');
  expect(body).toHaveProperty('id'); // The API usually returns the new ID
});

test('should GET Google homepage and return 200 status', async ({ request }) => {
  // 1. Send the GET request
  const response = await request.get('https://google.com');

  // 2. Validate the status code (200 is "OK")
  expect(response.status()).toBe(200);
});