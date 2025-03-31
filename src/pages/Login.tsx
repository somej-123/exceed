import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../styles/Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: 실제 로그인 API 연동
      await new Promise(resolve => setTimeout(resolve, 1000));
      // 로그인 성공 시 처리
    } catch (err) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.loginContainer} bg-dark`}>
      <Card className={styles.loginCard}>
        <Card.Header className={styles.cardHeader}>
          <h2>로그인</h2>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger" className={styles.alert}>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? '로그인 중...' : '로그인'}
            </Button>
          </Form>
          <div className={styles.links}>
            <Link to="/register" className={styles.link}>
              회원가입
            </Link>
            <span className={styles.divider}>|</span>
            <Link to="/forgot-password" className={styles.link}>
              비밀번호 찾기
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login; 