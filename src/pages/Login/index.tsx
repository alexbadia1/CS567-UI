import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { APP_TITLE } from '../../lib/constants';

import './index.scss';

export const Login: React.FC = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = () => {};

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__content__title">{APP_TITLE}</div>
        <div className="login__content__form">
          <div className="login__content__form__title">
            Log into your account
          </div>
          <div className="margin-24" />
          <div className="margin-24" />

          {/* Username */}
          <div className="login__content__form__field">
            <div className="login__content__form__field__label">
              <span>
                Username<span className="required">*</span>
              </span>
            </div>
            <div className="login__content__form__field__value">
              <input type="text" ref={usernameRef} required />
            </div>
          </div>

          <div className="margin-24" />

          {/* Password */}
          <div className="login__content__form__field">
            <div className="login__content__form__field__label">
              <span>
                Password<span className="required">*</span>
              </span>
            </div>
            <div className="login__content__form__field__value">
              <input type="password" ref={passwordRef} required />
            </div>
          </div>

          <div className="margin-24" />
          <div className="margin-24" />

          <Button classnames="primary-button" text="Log In" onClick={handleLogin} />

          <div className="margin-24" />
          <div className="login__content__footer">
            <Link className="login__content__footer--login-link" to="/signup">
              Sign up for an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sign up for an account
