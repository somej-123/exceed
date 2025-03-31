import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import { showError } from '../utils/swal';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
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

    if (formData.password !== formData.confirmPassword) {
      showError('오류','비밀번호가 일치하지 않습니다.');
      // setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);

    try {
      // TODO: 실제 회원가입 API 연동
      await new Promise(resolve => setTimeout(resolve, 1000));
      // 회원가입 성공 시 처리
    } catch (err) {
      showError('오류','회원가입에 실패했습니다. 다시 시도해주세요.');
      // setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.loginContainer} bg-dark`}>
      <Card className={styles.loginCard}>
        <Card.Header className={styles.cardHeader}>
          <h2>회원가입</h2>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger" className={styles.alert}>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </Form.Group>
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
            <Form.Group className="mb-3">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
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
              {loading ? '가입 중...' : '회원가입'}
            </Button>
          </Form>
          <div className={styles.links}>
            <Link to="/login" className={styles.link}>
              이미 계정이 있으신가요? 로그인
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register; 