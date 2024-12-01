import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// reactstrap components
import { Card, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false); // Для отображения загрузки

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Функция для отправки запроса к API
  const fetchGPTResponse = async (userMessage) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://geminiapific.pythonanywhere.com/generate_content?prompt=Представь что ты экономические эксперт и тебе задали такой вопрос: ${encodeURIComponent(userMessage)}`);
      setLoading(false);
      return response.data.response || "Ошибка: пустой ответ от API";
    } catch (error) {
      setLoading(false);
      console.error("Error fetching GPT response:", error);
      return "Не удалось связаться с сервером. Проверьте подключение к сети или повторите попытку позже.";
    }
  };
  

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessages = [...messages, { text: inputValue, fromMe: true }];
    setMessages(newMessages);
    setInputValue('');

    const gptResponse = await fetchGPTResponse(inputValue);

    setMessages([...newMessages, { text: gptResponse, fromMe: false }]);
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
        {loading && (
          <div style={{ textAlign: 'left', marginBottom: '10px', fontStyle: 'italic', color: '#888' }}>
            GPT пишет...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите ваше сообщение"
        style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
      />
      <button
        onClick={sendMessage}
        style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        disabled={loading} // Отключаем кнопку во время загрузки
      >
        Отправить
      </button>
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
