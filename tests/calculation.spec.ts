import { expect } from '@playwright/test';
import { test } from '../utils/fixtures';
import { CalculationData } from '../utils/types/calculation.types';
import { CALCULATION_ERROR_MESSAGE } from '../utils/consts';

test.describe('Interest Calculation Tests', () => {
    test.beforeEach(async ({ calculationPage }) => {
        calculationPage.page.on('dialog', dialog => dialog.dismiss());
        await calculationPage.visit();
    });

    test('should calculate daily interest correctly', async ({ calculationPage }) => {
        const calculationData: CalculationData = {
            principal: 1000,
            interestRate: '5%',
            duration: 'daily',
            consent: true
        };
        await calculationPage.calculateInterest(calculationData);

        await expect(calculationPage.interestAmount).toContainText('0.14');
        await expect(calculationPage.totalAmount).toContainText('1000.14');
    });

    test('should calculate monthly interest correctly', async ({ calculationPage }) => {
        const calculationData: CalculationData = {
            principal: 1000,
            interestRate: '5%',
            duration: 'monthly',
            consent: true
        };
        await calculationPage.calculateInterest(calculationData);

        await expect(calculationPage.interestAmount).toContainText('5.00');
        await expect(calculationPage.totalAmount).toContainText('1005.00');
    });

    test('should calculate yearly interest correctly', async ({ calculationPage }) => {
        const calculationData: CalculationData = {
            principal: 1000,
            interestRate: '5%',
            duration: 'yearly',
            consent: true
        };
        await calculationPage.calculateInterest(calculationData);

        await expect(calculationPage.interestAmount).toContainText('50.00');
        await expect(calculationPage.totalAmount).toContainText('1050.00');
    });

    test('should round interest and total amount to two decimal places', async ({ calculationPage }) => {
        const calculationData: CalculationData = {
            principal: 11000,
            interestRate: '8%',
            duration: 'yearly',
            consent: true
        };
        await calculationPage.calculateInterest(calculationData);

        // regex to check if the text contains a number with two decimal places
        //i would in future make a matcher to make this more readable and reusable
        await expect(calculationPage.interestAmount).toContainText(/\d+\.\d{2}/);
        await expect(calculationPage.totalAmount).toContainText(/\d+\.\d{2}/);
    });

    test('should require a principal amount', async ({ calculationPage }) => {
        const calculationData: CalculationData = {
            principal: 0,
            interestRate: '5%',
            duration: 'yearly',
            consent: true
        };
        const dialogPromise = calculationPage.page.waitForEvent('dialog');
        await calculationPage.calculateInterest(calculationData);
        const dialog = await dialogPromise;

        expect(dialog.message()).toBe(CALCULATION_ERROR_MESSAGE);
    });

    test('should prevent submission without consent', async ({ calculationPage }) => {
        const calculationData: CalculationData = {
            principal: 1000,
            interestRate: '5%',
            duration: 'yearly',
            consent: false
        };
        const dialogPromise = calculationPage.page.waitForEvent('dialog');
        await calculationPage.calculateInterest(calculationData);
        const dialog = await dialogPromise;

        expect(dialog.message()).toBe(CALCULATION_ERROR_MESSAGE);
    });
});