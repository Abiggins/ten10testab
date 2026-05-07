import { Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.emailInput = this.page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password', exact: true });
        this.submitButton = this.page.getByRole('button', { name: 'Log in' });
    }

    async visit() {
        await this.page.goto('/account/login');
    }

    async login({ email, password }: { email: string; password: string }) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
}