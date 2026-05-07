export type CalculationData = {
    principal: number;
    interestRate: string;
    duration: 'daily' | 'monthly' | 'yearly';
    consent: boolean;
}