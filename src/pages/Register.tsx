import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from '../styles/Login.module.css';
import { apiClient } from '../api/client';

const schema = yup.object().shape({
  id: yup
    .string()
    .required('아이디를 입력해주세요')
    .min(4, '아이디는 최소 4자 이상이어야 합니다')
    .max(20, '아이디는 최대 20자까지 가능합니다')
    .matches(/^[a-zA-Z0-9]+$/, '아이디는 영문자와 숫자만 사용 가능합니다'),
  email: yup
    .string()
    .required('이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다')
    .max(20, '비밀번호는 최대 20자까지 가능합니다')
    .matches(
      /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,20}$/,
      '비밀번호는 영문 소문자와 숫자를 포함해야 합니다'
    ),
  confirmPassword: yup
    .string()
    .required('비밀번호를 다시 입력해주세요')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다'),
});

type FormData = yup.InferType<typeof schema>;

const Register: React.FC = () => {
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
      console.log('회원가입 시도:', data);
      // await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await apiClient.post('/api/users/register', {
        userId: data.id,
        email: data.email,
        password: data.password
      });
      console.log(response);
      // 실제 회원가입 로직 구현

    } catch {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.loginCard}>
        <Card.Header className={styles.cardHeader}>
          <h2>회원가입</h2>
          <p>새로운 계정을 만들어보세요</p>
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
              <Form.Label className={styles.formLabel}>이메일</Form.Label>
              <div className={styles.inputWrapper}>
                <FaEnvelope className={styles.inputIcon} />
                <Form.Control
                  type="email"
                  placeholder="이메일을 입력하세요"
                  {...register('email')}
                  className={`${styles.formControl} ${errors.email ? 'is-invalid' : ''}`}
                />
              </div>
              {errors.email && (
                <div className="invalid-feedback d-block">
                  {errors.email.message}
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

            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>비밀번호 확인</Form.Label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <Form.Control
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  {...register('confirmPassword')}
                  className={`${styles.formControl} ${errors.confirmPassword ? 'is-invalid' : ''}`}
                />
              </div>
              {errors.confirmPassword && (
                <div className="invalid-feedback d-block">
                  {errors.confirmPassword.message}
                </div>
              )}
            </Form.Group>

            <Button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? '가입 중...' : '회원가입'}
            </Button>
          </Form>

          <div className={styles.links}>
            <span>이미 계정이 있으신가요?</span>
            <Link to="/login" className={styles.link}>
              로그인
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register; 