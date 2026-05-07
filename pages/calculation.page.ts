import { expect, Locator, Page } from '@playwright/test';
import { CalculationData } from '../utils/types/calculation.types';

export class CalculationPage {
    readonly page: Page;
    readonly pageHeading: Locator
    readonly interestAmount: Locator
    readonly totalAmount: Locator
    readonly principalSlider: Locator
    readonly interestRateDropdown: Locator
    readonly calculateButton: Locator
    readonly consentCheckbox: Locator
    readonly dailyLink: Locator
    readonly monthlyLink: Locator
    readonly yearlyLink: Locator

    constructor(page: Page) {
        this.page = page;
        this.pageHeading = this.page.getByRole('heading', { name: 'Interest Calculator' });
        this.interestAmount = this.page.locator('#interestAmount');
        this.totalAmount = this.page.locator('#totalAmount');
        this.principalSlider = this.page.getByLabel('Principal Amount:');
        this.interestRateDropdown = this.page.getByRole('button', { name: 'Select Interest Rate' });
        this.calculateButton = this.page.getByRole('button', { name: 'Calculate' });
        this.consentCheckbox = this.page.getByRole('checkbox', { name: 'Please accept this mandatory consent' });
        this.dailyLink = this.page.getByRole('link', { name: 'Daily' });
        this.monthlyLink = this.page.getByRole('link', { name: 'Monthly' });
        this.yearlyLink = this.page.getByRole('link', { name: 'Yearly' });
    }

    async selectDuration(duration: 'daily' | 'monthly' | 'yearly') {
        switch (duration) {
            case 'daily': await this.dailyLink.click(); break;
            case 'monthly': await this.monthlyLink.click(); break;
            case 'yearly': await this.yearlyLink.click(); break;
        }
    }

    async selectInterestRate(interestRate: string) {
        await this.interestRateDropdown.click();
        await this.page.getByRole('checkbox', { name: interestRate, exact: true }).click();
        await this.page.getByText(interestRate, { exact: true }).click();
    }

    async visit() {
        await this.page.goto('');
    }

    /**
     * takes in the calculation data and fills in the form accordingly, then clicks the calculate button
     * @param calculationData the data to be used for the calculation
     */
    async calculateInterest(calculationData: CalculationData) {
        await this.principalSlider.fill(calculationData.principal.toString());
        await this.selectInterestRate(calculationData.interestRate);
        await this.selectDuration(calculationData.duration);
        calculationData.consent && await this.consentCheckbox.check();
        await this.calculateButton.click();
    }
}
