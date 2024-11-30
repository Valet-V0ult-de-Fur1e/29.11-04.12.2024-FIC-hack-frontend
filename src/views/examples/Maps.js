
import React, { useState, useRef, useEffect } from 'react';

// reactstrap components
import { Card, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";


const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    setMessages([...messages, { text: inputValue, fromMe: true }]);
    setInputValue('');
  };

  const receiveMessage = () => {
    setMessages([...messages, { text: 'Hello from the other side!', fromMe: false }]);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <div style={{ height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ textAlign: message.fromMe ? 'right' : 'left', marginBottom: '10px' }}>
            <div style={{
              backgroundColor: message.fromMe ? '#007bff' : '#f9f9f9',
              color: message.fromMe ? '#fff' : '#000',
              padding: '5px',
              margin: '5px',
              borderRadius: '5px',
              display: 'inline-block'
            }}>
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={receiveMessage} style={{ padding: '5px 10px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Receive Message</button>
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
              <Chat />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Maps;
