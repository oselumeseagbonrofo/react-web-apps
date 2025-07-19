import investmentLogo from '../assets/investment-calculator-logo.png';

const Header = () =>{
    return (
        <header id="header">
        <img alt="Investment Calculator Logo" src={investmentLogo} />
        <h1>Oselumese's Investment Calculator</h1>
        <p>Calculate your investment growth over time</p>
        </header>
    );
}

export default Header;