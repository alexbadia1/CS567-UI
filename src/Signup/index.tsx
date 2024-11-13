import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '../lib/TextField';
import Button from '../lib/Button';

import './index.scss';

export const Signup: React.FC = () => {

  return (
    <div className="signup">
      <div className="signup__content">
        <div className="signup__content--title">MCS Degree Planner</div>
        <div className="signup__content__form">
          <div className="signup__content__form--title">
            Sign up for a new account
          </div>
          <div className="margin-24"></div>

          <div>
            <TextField />
            <TextField />
          </div>

          <div className="margin-24"></div>
          <TextField />
          <div className="margin-24"></div>
          <TextField />
          <div className="margin-24"></div>

          <TextField />

          <div className="margin-24"></div>

          <TextField />

          <div className="margin-24"></div>

          <TextField />

          <div className="margin-24"></div>

          <Button />
          <div className="margin-24"></div>
          <div className="signup__content__footer">
            <Link className="signup__content__footer--login-link" to="/login">
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
