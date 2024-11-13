import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '../../components/TextField';
import Button from '../../components/Button';

import './index.scss';

export const Login: React.FC = () => {
  return (
    <div className="login">
      <div className="login__content">
        <div className="login__content--title">MCS Degree Planner</div>
        <div className="login__content__form">
          <div className="login__content__form--title">
            Log into your account
          </div>
          <div className="margin-24"></div>
          <TextField />
          <div className="margin-24"></div>
          <TextField />

          <div className="margin-24"></div>

          <Button />
          <div className="margin-24"></div>
          <div className="login__content__footer">
            <Link className="login__content__footer--signup-link" to="/signup">
              Sign up for an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
