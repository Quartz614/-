import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import Places from './pages/Places';
import Detail from './pages/Detail';
import LogIn from './pages/LogIn';
import MyPage from './pages/MyPage';
import Register from './pages/Register';
import SignUp from './pages/SignUp';
import NotFound from './components/NotFound';
import header from './utils/header';

function App() {
  const [timer, setTimer] = useState(false);

  const token = localStorage.getItem('ACCESS');
  const isLogIn = localStorage.getItem('REFRESH');

  const expiration = 60 * 30 * 1000;

  const reIssue = async () => {
    if (!isLogIn) return;

    const { exp } = jwt_decode(token);
    const currentTime = Math.ceil(Date.now() / 1000);

    if (exp - currentTime > 60 * 3) return;

    if (currentTime > exp) {
      alert('다시 로그인 해주세요');
      localStorage.removeItem('ACCESS');
      localStorage.removeItem('REFRESH');
    }

    if (exp - currentTime <= 60 * 3) {
      const response = await axios.get('/auth/re-issue', header);
      localStorage.setItem(
        'ACCESS',
        `Bearer ${response.headers.authorization}`,
      );
    }
  };

  useEffect(() => {
    reIssue();
    setTimeout(() => {
      setTimer(!timer);
    }, expiration - 60000);
  }, [isLogIn, timer]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Places />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
