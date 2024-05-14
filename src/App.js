import "./App.css";
import CurrencyInput from "./CurrencyInput";
import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "AXCZwPmXSgahZrY5zy7oCmo4NzLARzlk";
const CURRENCY_API = `https://api.apilayer.com/fixer/latest?base=USD&apikey=${API_KEY}`;

function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("INR");
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios.get(CURRENCY_API).then((response) => {
      setRates(response.data.rates);
    });
  }, []);


  function format(number) {
    return number.toFixed(2);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }

  useEffect( () => {
    if(!!rates){
      handleAmount1Change(1);
    }
  },[rates])

  function handleCurrency1Change(currency1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }

  if(rates.length === 0) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <div>
      <h1>Currency Converter</h1>
      <CurrencyInput
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1}
      />
      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2}
      />
    </div>
  );
}

export default App;
