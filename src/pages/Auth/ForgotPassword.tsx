import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { FaEnvelope, FaUser } from 'react-icons/fa';
import styles from '../../styles/Login.module.css';
import { apiClient } from '../../api/client';
import { showSuccess } from '../../utils/swal';
import { useNavigate } from 'react-router-dom';
const ForgotPassword: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkIdEmail, setCheckIdEmail] = useState(false);

  const navigate = useNavigate();

  // 아이디, 이메일 존재 여부 확인
  const handleSubmit = async (e: React.FormEvent) => {
    document.getElementById('firstInput')?.focus();
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if(userId == 'somej' || email == 'somej@naver.com'){
      setError('금지된 아이디 또는 이메일입니다.');
      setIsLoading(false);
      return;
    }
    if(userId == 'wkdalxpfl12' || email == 'wkdalxpfl12@gmail.com'){
      setError('금지된 아이디 또는 이메일입니다.');
      setIsLoading(false);
      return;
    }
    if(userId == 'admin' || email == 'admin@naver.com'){
      setError('금지된 아이디 또는 이메일입니다.');
      setIsLoading(false);
      return;
    }
    if(userId == 'test' || email == 'test@naver.com'){
      setError('금지된 아이디 또는 이메일입니다.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiClient.post('/api/users/forgotPassword', { userId, email });

      if(response.data.isSuccess){
        setSuccess('비밀번호는 영문 소문자와 숫자를 포함해야 합니다. (*최소6자 ~ 최대20자)');
        setCheckIdEmail(true);
        showSuccess('성공', '인증이 완료되었습니다. 새로운 비밀번호를 입력해주세요');
        
      }else{
        setError('아이디 또는 이메일이 존재하지 않습니다.');
        setCheckIdEmail(false);
      }

    } catch (err: any) {
      setError('아이디 또는 이메일이 존재하지 않습니다.');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async(e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if(password !== passwordCheck){
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if(password.length < 6 || password.length > 20){
      setError('비밀번호는 최소 6자, 최대 20자여야 합니다.');
      return;
    }

    if(!/^(?=.*[a-z])(?=.*\d)[a-z\d]{6,20}$/.test(password)){
      setError('비밀번호는 영문 소문자와 숫자만 포함해야 합니다.');
      return;
    }

    const response = await apiClient.post('/api/users/changePassword', { userId, password });

    if(response.data.isSuccess){
      showSuccess('성공', '비밀번호가 변경되었습니다.\n다시 로그인 해주세요.');
      navigate('/login');
    }else{
      setError('비밀번호 변경에 실패했습니다.');
    }

    
    
  }

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
          <Form onSubmit={checkIdEmail ? handleChangePassword : handleSubmit}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>{checkIdEmail ? "비밀번호" : "아이디"}</Form.Label>
              <div className={styles.inputWrapper}>
                <FaUser className={styles.inputIcon} />
                <Form.Control
                  type={checkIdEmail ? "password" : "text"}
                  id='firstInput'
                  placeholder={checkIdEmail ? "비밀번호를 입력하세요" : "아이디를 입력하세요"}
                  value={checkIdEmail ? password : userId}
                  onChange={e => checkIdEmail ? setPassword(e.target.value) : setUserId(e.target.value)}
                  className={styles.formControl}
                  required
                />
              </div>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>{checkIdEmail ? "비밀번호 확인" : "이메일"}</Form.Label>
              <div className={styles.inputWrapper}>
                <FaEnvelope className={styles.inputIcon} />
                <Form.Control
                  type={checkIdEmail ? "password" : "email"}
                  id='secondInput'
                  placeholder={checkIdEmail ? "비밀번호를 다시 입력하세요" : "이메일을 입력하세요"}
                  value={checkIdEmail ? passwordCheck : email}
                  onChange={e => checkIdEmail ? setPasswordCheck(e.target.value) : setEmail(e.target.value)}
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
              {isLoading ? '전송 중...' : '확인'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ForgotPassword; 