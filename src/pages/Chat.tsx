import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { BsSend, BsRobot, BsPerson } from 'react-icons/bs';
import { useState } from 'react';
import styles from '../styles/Chat.module.css';
import { useChatStore } from '../store/chatStore';

const Chat = () => {
  const [inputMessage, setInputMessage] = useState('');
  const { messages, isLoading, error, sendMessage, getModelList } = useChatStore();

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;
    
    await sendMessage(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className={`${styles.chatCard} border-0 shadow-sm`}>
            <Card.Header className="bg-primary text-white py-3">
              <div className="d-flex align-items-center">
                <BsRobot className="me-2" size={24} />
                <h5 className="mb-0">AI 어시스턴트</h5>
              </div>
            </Card.Header>

            <Card.Body className={`${styles.chatBody} p-4`}>
              {messages.map((msg: any, index: number) => (
                <div key={index} className={`${styles.chatMessage} ${msg.type === 'user' ? styles.userMessage : ''}`}>
                  <div className={styles.messageContent}>
                    <div className={styles.messageIcon}>
                      {msg.type === 'user' ? <BsPerson size={20} /> : <BsRobot size={20} />}
                    </div>
                    <div className={styles.messageText}>
                      <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                      <small className={styles.messageTime}>{msg.timestamp}</small>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={styles.chatMessage}>
                  <div className={styles.messageContent}>
                    <div className={styles.messageIcon}>
                      <BsRobot size={20} />
                    </div>
                    <div className={styles.messageText}>
                      입력 중...
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="text-danger text-center my-2">
                  {error}
                </div>
              )}
            </Card.Body>

            <Card.Footer className="bg-white border-0 p-3">
              <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                <Form.Control
                  type="text"
                  placeholder="메시지를 입력하세요..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="me-2 rounded-pill"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  variant="primary" 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '46px', height: '46px' }}
                >
                  <BsSend />
                </Button>
              </Form>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Button onClick={()=>{
        getModelList();
        // alert(`현재 모델은 ${modelList.id}입니다.`);
      }}>
        <BsRobot size={20} />
      </Button>
    </Container>
  );
};

export default Chat;
