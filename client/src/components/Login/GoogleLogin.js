import React from 'react';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';

function GoogleLogin() {
  const GOOGLE_AUTH_URL = `${process.env.REACT_APP_SERVER_BASE_URL}/oauth2/authorization/google`;

  return (
    <Container>
      <a href={GOOGLE_AUTH_URL}>
        <button type="button" className="google-button">
          <FcGoogle className="googleLogo" />
        </button>
      </a>
    </Container>
  );
}

const Container = styled.div`
  a {
    text-decoration: none;
  }
  .google-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    background-color: #f9f9f9;
    border-radius: 40px;
    border: none;
    color: #2b2b2b;
    font-weight: 600;
    font-family: system ui;

    .googleLogo {
      font-size: 1.3rem;
      height: 20px;
      padding-bottom: 1.2px;
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

export default GoogleLogin;
