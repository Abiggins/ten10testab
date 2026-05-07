import { expect } from '@playwright/test';
import { test } from '../utils/fixtures';
import { CalculationData } from '../utils/types/calculation.types';

test.describe('Mobile Interest Calculation Tests', () => {
    test.use({ viewport: { width: 412, height: 915 } });

    test.beforeEach(async ({ calculationPage }) => {
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

        expect(calculationPage.interestAmount).toContainText('0.14');
        expect(calculationPage.totalAmount).toContainText('1000.14');
    });
});