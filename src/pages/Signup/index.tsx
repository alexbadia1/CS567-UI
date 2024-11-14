import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { APP_TITLE } from '../../lib/constants';

import './index.scss';

export function Signup() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const birthdateRef = useRef(null);
  const genderRef = useRef(null);
  const politicalAffiliationRef = useRef(null);

  const handleSignup = () => {};

  return (
    <div className="signup">
      <div className="signup__content">
        <div className="signup__content__title">{APP_TITLE}</div>
        <div className="signup__content__form">
          <div className="signup__content__form__title">
            Sign up for a new account
          </div>
          <div className="margin-24" />
          <div className="margin-24" />

          {/* Username */}
          <div className="signup__content__form__field">
            <div className="signup__content__form__field__label">
              <span>
                Username<span className="required">*</span>
              </span>
            </div>
            <div className="signup__content__form__field__value">
              <input type="text" ref={usernameRef} required />
            </div>
          </div>

          <div className="margin-24" />

          {/* Password */}
          <div className="signup__content__form__field">
            <div className="signup__content__form__field__label">
              <span>
                Password<span className="required">*</span>
              </span>
            </div>
            <div className="signup__content__form__field__value">
              <input type="password" ref={passwordRef} required />
            </div>
          </div>

          <div className="margin-24" />

          {/* Confirm Password */}
          <div className="signup__content__form__field">
            <div className="signup__content__form__field__label">
              <span>
                Confirm Password<span className="required">*</span>
              </span>
            </div>
            <div className="signup__content__form__field__value">
              <input type="password" ref={confirmPasswordRef} required />
            </div>
          </div>

          {/* Section Divider */}
          <div className="margin-24" />
          <div className="margin-24" />

          {/* Age */}
          <div className="signup__content__form__field">
            <div className="signup__content__form__field__label">
              <span>
                Birthdate<span className="required">*</span>
              </span>
            </div>
            <div className="signup__content__form__field__value">
              <input type="date" name="birthdate" ref={birthdateRef} required />
            </div>
          </div>

          <div className="margin-24" />

          {/* Gender */}
          <div className="signup__content__form__field">
            <div className="signup__content__form__field__label">
              <span>
                Gender<span className="required">*</span>
              </span>
            </div>
            <div className="signup__content__form__field__value">
              <input type="text" ref={genderRef} required />
            </div>
          </div>

          <div className="margin-24" />

          {/* Political Affiliation */}
          <div className="signup__content__form__field">
            <div className="signup__content__form__field__label">
              <span>
                Political Affiliation<span className="required">*</span>
              </span>
            </div>
            <div className="signup__content__form__field__value">
              <input type="text" ref={politicalAffiliationRef} required />
            </div>
          </div>

          <div className="margin-24" />
          <div className="margin-24" />

          <Button
            classnames="primary-button"
            text="Sign Up"
            onClick={handleSignup}
          />

          <div className="margin-24" />
          <div className="signup__content__footer">
            <Link className="signup__content__footer--login-link" to="/login">
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
