
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CurrencyRates.css'; 

const CurrencyRates = () => {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        const response = await axios.get(
          'https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=pk_42d68cab7b334b0d8e0579757841ccc6'
        );
        setRates(response.data);
      } catch (error) {
        console.error('Error fetching currency rates:', error);
      }
    };

    fetchCurrencyRates();
  }, []);

  return (
    <div className="currency-rates-container">
      <h2 className="currency-rate-header">Currency Rates</h2>
      <ul>
        {rates.map((rate) => (
          <li key={rate.symbol} className="currency-rate">
            $<span className="currency-symbol">{rate.symbol}:</span> {rate.rate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyRates;
