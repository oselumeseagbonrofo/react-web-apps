import { calculateInvestmentResults, formatter } from "../util/investment";

const Results = ({ investmentVariables }) => {
  // Calculate investment result
  const investmentResult = calculateInvestmentResults(investmentVariables);
  const initialInvestment =
    investmentResult[0].valueEndOfYear -
    investmentResult[0].interest -
    investmentResult[0].annualInvestment;

  return (
    <table id="result" className="center">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest Earned</th>
          <th>Yearly Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {investmentResult.map((yearlyInvestment, index) => {
          // Total interest ever earned
          const totalInterest =
            yearlyInvestment.valueEndOfYear -
            yearlyInvestment.annualInvestment * yearlyInvestment.year -
            initialInvestment;

          // Capital invested at year start
          const totalAmountInvested =
            yearlyInvestment.valueEndOfYear - totalInterest;

          return (
            <tr key={yearlyInvestment.year}>
              <td>{yearlyInvestment.year}</td>
              <td>{formatter.format(yearlyInvestment.valueEndOfYear)}</td>
              <td>{formatter.format(yearlyInvestment.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Results;
