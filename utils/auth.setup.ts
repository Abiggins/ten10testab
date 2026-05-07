import { expect } from '@playwright/test';
import { test as setup} from '../utils/fixtures';
import testProps from '../config.json';


setup('authenticate user', async ({ loginPage, calculationPage, page }) => {
  await loginPage.visit();
  await loginPage.login({ ...testProps.credentials });
  await expect(calculationPage.pageHeading).toBeVisible();
  await page.context().storageState({
    path: 'playwright/.auth/user.json',
  });
});