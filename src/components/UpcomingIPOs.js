// components/UpcomingIPOs.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UpcomingIPOs.css'; // Import a CSS file for styling

const UpcomingIPOs = () => {
  const [upcomingIPOs, setUpcomingIPOs] = useState([]);

  useEffect(() => {
    const fetchUpcomingIPOs = async () => {
      try {
        const response = await axios.get(
          'https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=pk_42d68cab7b334b0d8e0579757841ccc6'
        );
        // Replace 'YOUR_IEX_CLOUD_API_TOKEN' with your actual IEX Cloud API token

        // Extract the IPOs data from the response
        const ipos = response.data;

        // Set the state with the upcoming IPOs
        setUpcomingIPOs(ipos);
      } catch (error) {
        console.error('Error fetching upcoming IPOs:', error);
      }
    };

    // Call the fetch function
    fetchUpcomingIPOs();
  }, []);

  return (
    <div className="ipo-container">
      <h2>Upcoming IPOs</h2>
      {upcomingIPOs.map((ipo) => (
        <div key={ipo.symbol} className="ipo-card">
          <h3>{ipo.companyName} | | Price Range: ${ipo.priceRangeLow} - ${ipo.priceRangeHigh}</h3>
          <br/>
          <p>
            Symbol: {ipo.symbol} | Shares: {ipo.shares}  | FiledDate: ${ipo.filedDate}
          </p>
          <br/>
          <p>Managers: {ipo.managers}</p>
        </div>
      ))}
    </div>
  );
};

export default UpcomingIPOs;
