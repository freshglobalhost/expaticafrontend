export interface LoanCalculation {
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
  interestRate: number;
}

export function calculateLoan(
  principal: number,
  durationMonths: number,
  annualRate = 0.18
): LoanCalculation {
  const monthlyRate = annualRate / 12;
  const monthlyPayment =
    monthlyRate === 0
      ? principal / durationMonths
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, durationMonths)) /
        (Math.pow(1 + monthlyRate, durationMonths) - 1);

  const totalRepayment = monthlyPayment * durationMonths;
  const totalInterest = totalRepayment - principal;

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalRepayment: Math.round(totalRepayment),
    totalInterest: Math.round(totalInterest),
    interestRate: annualRate * 100,
  };
}
