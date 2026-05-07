import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CalculationPage } from '../pages/calculation.page';


type MyFixtures = {
  loginPage: LoginPage;
    calculationPage: CalculationPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  calculationPage: async ({ page }, use) => {
    const calculationPage = new CalculationPage(page);
    await use(calculationPage);
  }
});