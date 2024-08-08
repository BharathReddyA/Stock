import React, { useState } from "react";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const StockData = () => {
  const [symbol, setSymbol] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [updateSymbol, setUpdateSymbol] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const getYesterdayDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleGetStockData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/getStockData",
        {
          symbol,
          startDate,
          endDate,
        }
      );
      setData(response.data);
      setError("");
    } catch (err) {
      setError("Error fetching data. Please check the inputs and try again.");
      setData(null);
    }
  };

  const handleUpdateStockData = async (e) => {
    e.preventDefault();
    console.log("Updating stock data for symbol:", updateSymbol);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/updateStockData",
        {
          symbol: updateSymbol,
        }
      );
      console.log("Response:", response.data);
      setUpdateMessage(response.data.message);
      setError("");
    } catch (err) {
      console.error("Error updating stock data:", err.response || err.message);
      setError("Error updating data. Please check the symbol and try again.");
      setUpdateMessage("");
    }
  };

  return (
    <Container fluid className="mainBody m-1">
      <Row className="py-5">
        <Col lg={2}></Col>
        <Col lg={8}>
          <h1>Stock Data</h1>
          <Form onSubmit={handleGetStockData}>
            <Form.Group controlId="formSymbol">
              <Form.Label>Stock Symbol</Form.Label>
              <Form.Control
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                max={getYesterdayDate()}
              />
            </Form.Group>
            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                max={getYesterdayDate()}
              />
            </Form.Group>
            <Button type="submit">Get Data</Button>
          </Form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {data && (
            <div>
              <h2>Results for {data.symbol}</h2>
              <p>Highest Value: {data.highestValue}</p>
              <p>Lowest Value: {data.lowestValue}</p>
              <h3>Data in Range:</h3>
              <table className="table table-bordered">
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
                      <td>
                        {new Date(entry.timestamp * 1000).toLocaleDateString()}
                      </td>
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
          <Form onSubmit={handleUpdateStockData}>
            <Form.Group controlId="formUpdateSymbol">
              <Form.Label>Stock Symbol</Form.Label>
              <Form.Control
                type="text"
                value={updateSymbol}
                onChange={(e) => setUpdateSymbol(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit">Update Data</Button>
          </Form>
          {updateMessage && <p>{updateMessage}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default StockData;
