import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { FaEnvelope, FaUser } from 'react-icons/fa';
import styles from '../styles/Login.module.css';
import { apiClient } from '../api/client';

const ForgotPassword: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    try {
      const response = await apiClient.post('/api/users/forgotPassword', { userId, email });
      
      setSuccess('인증이 완료되었습니다. 새로 변경하실 비밀번호를 입력해주세요');

      console.log(response.data.isSuccess);


    } catch (err: any) {
      setError('이메일 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.loginCard}>
        <Card.Header className={styles.cardHeader}>
          <h2>비밀번호 찾기</h2>
          <p>가입하신 아이디와 이메일을 입력해주세요</p>
        </Card.Header>
        <Card.Body className={styles.cardBody}>
          {error && <Alert variant="danger" className={styles.alert}>{error}</Alert>}
          {success && <Alert variant="success" className={styles.alert}>{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>아이디</Form.Label>
              <div className={styles.inputWrapper}>
                <FaUser className={styles.inputIcon} />
                <Form.Control
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  className={styles.formControl}
                  required
                />
              </div>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>이메일</Form.Label>
              <div className={styles.inputWrapper}>
                <FaEnvelope className={styles.inputIcon} />
                <Form.Control
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={styles.formControl}
                  required
                />
              </div>
            </Form.Group>
            <Button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? '전송 중...' : '비밀번호 재설정 메일 보내기'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ForgotPassword; 