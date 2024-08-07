import React, { useState } from 'react';
import axios from 'axios';

const StockData = () => {
  const [symbol, setSymbol] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [updateSymbol, setUpdateSymbol] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  const handleGetStockData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/getStockData', {
        symbol,
        startDate,
        endDate,
      });
      setData(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching data. Please check the inputs and try again.');
      setData(null);
    }
  };

  const handleUpdateStockData = async (e) => {
    e.preventDefault();
    console.log('Updating stock data for symbol:', updateSymbol);
  
    try {
      const response = await axios.post('http://localhost:5000/api/updateStockData', {
        symbol: updateSymbol,
      });
      console.log('Response:', response.data);
      setUpdateMessage(response.data.message);
      setError('');
    } catch (err) {
      console.error('Error updating stock data:', err.response || err.message);
      setError('Error updating data. Please check the symbol and try again.');
      setUpdateMessage('');
    }
  };
  

  return (
    <div>
      <h1>Stock Data</h1>
      <form onSubmit={handleGetStockData}>
        <div>
          <label>Stock Symbol:</label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Get Data</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <div>
          <h2>Results for {data.symbol}</h2>
          <p>Highest Value: {data.highestValue}</p>
          <p>Lowest Value: {data.lowestValue}</p>
          <h3>Data in Range:</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {data.dataInRange.map((entry) => (
                <tr key={entry.timestamp}>
                  <td>{new Date(entry.timestamp * 1000).toLocaleDateString()}</td>
                  <td>{entry.open}</td>
                  <td>{entry.high}</td>
                  <td>{entry.low}</td>
                  <td>{entry.close}</td>
                  <td>{entry.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h1>Update Stock Data</h1>
      <form onSubmit={handleUpdateStockData}>
        <div>
          <label>Stock Symbol:</label>
          <input
            type="text"
            value={updateSymbol}
            onChange={(e) => setUpdateSymbol(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Data</button>
      </form>
      {updateMessage && <p>{updateMessage}</p>}
    </div>
  );
};

export default StockData;
