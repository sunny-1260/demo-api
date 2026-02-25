import { test, expect } from '@playwright/test';
import { query } from './DB/db.js';

let f_name = "Sunny"
let l_name = "Verma"
let email = f_name + l_name + "@yopmail.com"

test('Verify user sign-up from UI and API/DB validation', async({page}) => { 
    // UI SIGN-UP

    await page.goto('https://qa.taltektc.com/')
    await page.waitForTimeout(3000);
    await page.locator('.new-account').click()
    await page.locator('[name="firstName"]').fill(f_name)
    await page.locator('[name="lastName"]').fill(l_name)
    await page.locator('[name="email"]').fill(email)
    await page.locator('[name="password"]').fill("123456")
    await page.locator('[name="confirmPassword"]').fill("123456")
    await page.locator('#male').click()
    await page.locator('[name="agree"]').click()
    await page.locator('button[type=submit]').click()
    await page.waitForTimeout(2000);
    await page.waitForSelector('.swal-title');
    let user = await page.locator('.swal-text').innerText();
    const user_id = user.split(": ")[1].trim()
    console.log(user_id)
    await page.locator('.swal-button--confirm').click()

    // API GET USER
    const response = await page.request.get(`https://qa.taltektc.com/api/student/${user_id}`, {
        headers:
            {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QiLCJ1c2VyX3R5cGUiOiJyZWd1bGFyIiwidGltZXN0YW1wIjoxNzcxNjkzODgxfQ.u1EyV2DGEEZ2lFQAdxhq5QJTsVM5T99lGN1EakQj784" ,
                "api_token" : "DevGF4sg665s4ggFddfdgdgFFrs54D87sr54afggsTTC"
        }                                      
    })
    let body = await response.json()
    expect(response.status()).toBe(200)
    expect(body.message).toBe("Successfully loaded student information")
    expect(body.data.firstName).toBe(f_name)
    expect(body.data.student_id).toBe(user_id)

    // DB VALIDATION
    const rows = await query('SELECT * FROM users WHERE student_id = ?', [user_id]);
    expect(rows.length).toBeGreaterThan(0);
    expect(rows[0].first_name).toBe(f_name);
    console.log(rows[0].first_name)
})


// test('Verify user sign-up from API and UI Login flow', async({page}) => {
//     // API SIGN-UP
//     const response = await page.request.post('https://qa.taltektc.com/api/signup.php', {
//         headers:
//             {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QiLCJ1c2VyX3R5cGUiOiJyZWd1bGFyIiwidGltZXN0YW1wIjoxNzcxNjkzODgxfQ.u1EyV2DGEEZ2lFQAdxhq5QJTsVM5T99lGN1EakQj784" ,
//                 "api_token" : "DevGF4sg665s4ggFddfdgdgFFrs54D87sr54afggsTTC"
//         },
//         data:  
//             {
//                 "firstName": f_name,
//                 "lastName": l_name,
//                 "email": email,
//                 "password": "123456",
//                 "confirmPassword": "123456",
//                 "dob": {
//                     "year": 2002,
//                     "month": 1,
//                     "day": 13
//                 },
//                 "gender": "male",
//                 "agree": true
//             }                                      
//     })
//     console.log("Response is " + response)
//     let body = response.json()
//     expect(response.status()).toBe(200)
//     expect(body.message).toBe("User created successfully")
//     expect(body.data.firstName).toBe(f_name)
//     user_id = body.data.id
//     console.log("User ID is " + user_id)
    
//     // UI LOGIN
//     await page.goto('https://qa.taltektc.com/')
//     await page.locator('[name="email"]').fill(user_id)
//     await page.locator('[name="password"]').fill(123456)
//     await page.locator('.my-login').click()
//     await page.waitForLoadState('networkidle')

//     await expect(page.locator("h2.info")).toHaveText("Student Information")
//     await expect(page.locator("#email")).toHaveText(email)
// })