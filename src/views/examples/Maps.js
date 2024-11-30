
import React, { useState } from 'react';

// reactstrap components
import { Card, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";


const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = () => {
    setMessages([...messages, inputValue]);
    setInputValue('');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <div style={{ height: '300px', overflowY: 'scroll', marginBottom: '10px'}}>
        {messages.map((message, index) => (
          <div key={index} style={{ backgroundColor: '#f9f9f9', padding: '5px', margin: '5px', borderRadius: '5px' }}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
      />
      <button onClick={sendMessage} style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Send</button>
    </div>
  );
};

const Maps = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <Chat/>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Maps;
