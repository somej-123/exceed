import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaGoogle, FaGithub } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from '../styles/Login.module.css';

const schema = yup.object().shape({
  id: yup
    .string()
    .required('아이디를 입력해주세요')
    .min(4, '아이디는 최소 4자 이상이어야 합니다')
    .max(20, '아이디는 최대 20자까지 가능합니다'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다')
    .max(20, '비밀번호는 최대 20자까지 가능합니다'),
});

type FormData = yup.InferType<typeof schema>;

const Login: React.FC = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError('');

    try {
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      // 실제 로그인 로직 구현
      console.log('로그인 시도:', data);
    } catch {
      setError('로그인에 실패했습니다. ID와 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.loginCard}>
        <Card.Header className={styles.cardHeader}>
          <h2>환영합니다</h2>
          <p>서비스를 이용하시려면 로그인해주세요</p>
        </Card.Header>
        <Card.Body className={styles.cardBody}>
          {error && <Alert variant="danger" className={styles.alert}>{error}</Alert>}
          
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>아이디</Form.Label>
              <div className={styles.inputWrapper}>
                <FaUser className={styles.inputIcon} />
                <Form.Control
                  type="text"
                  placeholder="아이디를 입력하세요"
                  {...register('id')}
                  className={`${styles.formControl} ${errors.id ? 'is-invalid' : ''}`}
                />
              </div>
              {errors.id && (
                <div className="invalid-feedback d-block">
                  {errors.id.message}
                </div>
              )}
            </Form.Group>

            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>비밀번호</Form.Label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <Form.Control
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  {...register('password')}
                  className={`${styles.formControl} ${errors.password ? 'is-invalid' : ''}`}
                />
              </div>
              {errors.password && (
                <div className="invalid-feedback d-block">
                  {errors.password.message}
                </div>
              )}
            </Form.Group>

            <Button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </Form>

          <div className={styles.links}>
            <Link to="/forgot-password" className={styles.link}>
              비밀번호를 잊으셨나요?
            </Link>
            <span className={styles.divider}>|</span>
            <Link to="/register" className={styles.link}>
              회원가입
            </Link>
          </div>

          <div className={styles.socialLogin}>
            <p>또는 다음으로 계속하기</p>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <Button className={styles.socialButton}>
                <FaGoogle />
              </Button>
              <Button className={styles.socialButton}>
                <FaGithub />
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login; 