import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import styles from '../../styles/Login.module.css';
import { apiClient } from '../../api/client';
import { showSuccess } from '../../utils/swal';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const MyInfoChangePassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.userId);
  const logout = useAuthStore((state) => state.logout);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!userId) {
      setError('로그인이 필요합니다.');
      return;
    }

    if (password !== passwordCheck) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 6 || password.length > 20) {
      setError('비밀번호는 최소 6자, 최대 20자여야 합니다.');
      return;
    }

    if (!/^(?=.*[a-z])(?=.*\d)[a-z\d]{6,20}$/.test(password)) {
      setError('비밀번호는 영문 소문자와 숫자만 포함해야 합니다.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.post('/api/users/changePassword', { userId, password });
      if (response.data.isSuccess) {
        showSuccess('성공', '비밀번호가 변경되었습니다. 다시 로그인 해주세요.');
        logout();
        navigate('/login');
      } else {
        setError('비밀번호 변경에 실패했습니다.');
      }
    } catch (err: any) {
      setError('비밀번호 변경에 실패했습니다.');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.loginCard}>
        <Card.Header className={styles.cardHeader}>
          <h2>비밀번호 변경</h2>
          <p>새로운 비밀번호를 입력해주세요</p>
        </Card.Header>
        <Card.Body className={styles.cardBody}>
          {error && <Alert variant="danger" className={styles.alert}>{error}</Alert>}
          {success && <Alert variant="success" className={styles.alert}>{success}</Alert>}
          <Form onSubmit={handleChangePassword}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>비밀번호</Form.Label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <Form.Control
                  type="password"
                  id="firstInput"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={styles.formControl}
                  required
                />
              </div>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>비밀번호 확인</Form.Label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <Form.Control
                  type="password"
                  id="secondInput"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={passwordCheck}
                  onChange={e => setPasswordCheck(e.target.value)}
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
              {isLoading ? '변경 중...' : '비밀번호 변경'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyInfoChangePassword;
