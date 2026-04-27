import{test, expect} from '@playwright/test'


test('my 1st test', async ({page})=>{

    await page.goto('https://www.google.com')
    await expect(page).toHaveTitle('Google')
})

