import { test, expect, Page } from '@playwright/test';

async function openNewAccount(page: Page) {
  await page.getByRole('link', { name: 'Open New Account' }).click();

  await page.waitForTimeout(500);

  await page.locator('#type').selectOption({ index: 0 });
  await page.locator('#fromAccountId').selectOption({ index: 0 });

  await page.getByRole('button', { name: 'Open New Account' }).click();
  await expect(page.getByText('Account Opened!')).toBeVisible();
};

async function userLogin(page: Page, username: string, password: string) {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');

  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="username"]').press('Tab');
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.getByText('Account Services')).toBeVisible();
};

async function registerBaseUser(page: Page, username: string, password: string) {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'Register' }).click();

  await page.locator('[id="customer\\.firstName"]').click();
  await page.locator('[id="customer\\.firstName"]').fill('First Name');

  await page.locator('[id="customer\\.lastName"]').click();
  await page.locator('[id="customer\\.lastName"]').fill('Last Name');

  await page.locator('[id="customer\\.address\\.street"]').click();
  await page.locator('[id="customer\\.address\\.street"]').fill('Pantanal');

  await page.locator('[id="customer\\.address\\.city"]').click();
  await page.locator('[id="customer\\.address\\.city"]').fill('Florianopolis');

  await page.locator('[id="customer\\.address\\.state"]').click();
  await page.locator('[id="customer\\.address\\.state"]').fill('Santa Catarina');

  await page.locator('[id="customer\\.address\\.zipCode"]').click();
  await page.locator('[id="customer\\.address\\.zipCode"]').fill('88888888');

  await page.locator('[id="customer\\.phoneNumber"]').click();
  await page.locator('[id="customer\\.phoneNumber"]').fill('5548999999999');

  await page.locator('[id="customer\\.ssn"]').click();
  await page.locator('[id="customer\\.ssn"]').fill('12345678910');

  await page.locator('[id="customer\\.username"]').click();
  await page.locator('[id="customer\\.username"]').fill(username);

  await page.locator('[id="customer\\.password"]').click();
  await page.locator('[id="customer\\.password"]').fill(password);
  await page.locator('#repeatedPassword').click();
  await page.locator('#repeatedPassword').fill(password);

  await page.getByRole('button', { name: 'Register' }).click();
}

test('should register a random user', async ({ page }) => {
  const username = Math.random().toString();
  const password = Math.random().toString();

  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'Register' }).click();

  await page.locator('[id="customer\\.firstName"]').click();
  await page.locator('[id="customer\\.firstName"]').fill('First Name');

  await page.locator('[id="customer\\.lastName"]').click();
  await page.locator('[id="customer\\.lastName"]').fill('Last Name');

  await page.locator('[id="customer\\.address\\.street"]').click();
  await page.locator('[id="customer\\.address\\.street"]').fill('Pantanal');

  await page.locator('[id="customer\\.address\\.city"]').click();
  await page.locator('[id="customer\\.address\\.city"]').fill('Florianopolis');

  await page.locator('[id="customer\\.address\\.state"]').click();
  await page.locator('[id="customer\\.address\\.state"]').fill('Santa Catarina');

  await page.locator('[id="customer\\.address\\.zipCode"]').click();
  await page.locator('[id="customer\\.address\\.zipCode"]').fill('88888888');

  await page.locator('[id="customer\\.phoneNumber"]').click();
  await page.locator('[id="customer\\.phoneNumber"]').fill('5548999999999');

  await page.locator('[id="customer\\.ssn"]').click();
  await page.locator('[id="customer\\.ssn"]').fill('12345678910');

  await page.locator('[id="customer\\.username"]').click();
  await page.locator('[id="customer\\.username"]').fill(username);

  await page.locator('[id="customer\\.password"]').click();
  await page.locator('[id="customer\\.password"]').fill(password);
  await page.locator('#repeatedPassword').click();
  await page.locator('#repeatedPassword').fill(password);

  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.locator('h1')).toContainText(`Welcome ${username}`);
});

test.describe('parabank transfer', () => {
  test.beforeEach(async ({ page }) => {
    await registerBaseUser(page, "ericuser", "ericpass");
    await userLogin(page, "ericuser", "ericpass");
  });

  test('should open new account', async ({ page }) => {
    await openNewAccount(page);
  });

  test('should transfer funds between accounts', async ({ page }) => {
    const transferValue = "100.00";

    await openNewAccount(page);

    await page.getByRole('link', { name: 'Open New Account' }).click();

    await page.waitForTimeout(500);

    await page.locator('#type').selectOption({ index: 0 });
    await page.locator('#fromAccountId').selectOption({ index: 0 });

    await page.getByRole('button', { name: 'Open New Account' }).click();
    await page.getByRole('heading', { name: 'Account Opened!' }).click();

    await page.getByRole('link', { name: 'Accounts Overview' }).click();
    await page.getByRole('heading', { name: 'Accounts Overview' }).click();

    await page.getByRole('link', { name: 'Transfer Funds' }).click();

    await page.locator('#amount').click();
    await page.locator('#amount').fill(transferValue);
    const fromAccountId = await page.locator('#fromAccountId').selectOption({ index: 0 });
    const toAccountId = await page.locator('#toAccountId').selectOption({ index: 1 });
    await page.getByRole('button', { name: 'Transfer' }).click();
    await expect(page.getByRole('heading', { name: 'Transfer Complete!' })).toContainText('Transfer Complete!');
    await expect(page.getByText(`$${transferValue} has been transferred`)).toContainText(`$${transferValue} has been transferred from account #${fromAccountId} to account #${toAccountId}.`);
  })
})