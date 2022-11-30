import { useState } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { HasRefresh } from '../atoms';

const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const setIsLogIn = useSetRecoilState(HasRefresh);

  const navigator = useNavigate();

  const getErrorType = status => {
    if (status === 403) {
      return 'incorrectPassword';
    }
    if (status === 504) {
      return 'invalidEmail';
    }
    return 'regular';
  };

  const setErrorException = type => {
    if (type === 'incorrectPassword') {
      setErrorStatus(403);
      setErrorMessage('비밀번호를 잘못 입력했습니다');
      return null;
    }
    if (type === 'invalidEmail') {
      setErrorStatus(504);
      setErrorMessage('존재하지 않는 계정입니다.');
      return null;
    }
    return null;
  };

  const onSubmit = async data => {
    try {
      const response = await axios.post(`/auth/login`, data);
      await localStorage.setItem('ACCESS', response.headers.authorization);
      await localStorage.setItem('REFRESH', response.headers.refreshtoken);

      setIsLogIn(true);

      navigator('/');
    } catch (error) {
      const validationType = getErrorType(error.response.data.status);

      if (validationType !== 'regular')
        return setErrorException(validationType);
    }
    return null;
  };
  return {
    getErrorType,
    setErrorException,
    errorMessage,
    errorStatus,
    onSubmit,
  };
};

export default useLogin;