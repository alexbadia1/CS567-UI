import React, { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { Button } from '../../components/Button';
import { APP_TITLE } from '../../lib/constants';
import { FormField } from '../../components/FormField';
import { ToastContainer, toast } from 'react-toastify';
import { BarLoader } from 'react-spinners';

import './index.scss';

function isEmpty(name: string, value: string | null | undefined): boolean {
  if (value === null || value === undefined) {
    toast.error(`${name} is required`);
    return true;
  }
  if (value.trim() === '') {
    toast.error(`${name} is required`);
    return true;
  }
  return false;
}

export const Login: React.FC = () => {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const email: string | undefined = emailRef?.current?.value;
    const password: string | undefined = passwordRef?.current?.value;
    
    setLoading(true);

    // For dramatic effect
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (isEmpty('Email', email)) return;
    if (isEmpty('Password', password)) return;

    authContext
      ?.loginUser(email!, password!)
      .then((_) => navigate('/feed'))
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__content__title">{APP_TITLE}</div>
        <form className="login__content__form">
          <div className="login__content__form__title">
            Log into your account
          </div>
          <div className="margin-24" />
          {loading ? (
            <BarLoader cssOverride={{ marginTop: 16 }} />
          ) : (
            <>
              <FormField
                name="Username"
                fieldType="email"
                autoComplete="email"
                required={true}
                ref={emailRef}
              />

              <FormField
                name="Password"
                fieldType="password"
                autoComplete="current-password"
                required={true}
                ref={passwordRef}
              />

              <div className="margin-24" />
              <div className="margin-24" />

              <Button
                classnames="primary-button"
                text="Log In"
                onClick={handleLogin}
              />

              <div className="margin-24" />
              <div className="login__content__footer">
                <Link
                  className="login__content__footer--login-link"
                  to="/signup"
                >
                  Sign up for an account
                </Link>
              </div>
            </>
          )}
        </form>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
      />
    </div>
  );
};
