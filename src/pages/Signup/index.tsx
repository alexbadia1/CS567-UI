import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { Button } from '../../components/Button';
import { APP_TITLE, PROFILE_ENDPOINT } from '../../lib/constants';
import { FormField } from '../../components/FormField';
import { ToastContainer, toast } from 'react-toastify';
import { UserCredential } from 'firebase/auth';
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

export function Signup() {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const birthdateRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const raceRef = useRef<HTMLInputElement>(null);
  const maritalStatusRef = useRef<HTMLInputElement>(null);
  const employmentStatusRef = useRef<HTMLInputElement>(null);
  const educationLevelRef = useRef<HTMLInputElement>(null);
  const politicalAffiliationRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const email: string | undefined = emailRef?.current?.value;
    const password: string | undefined = passwordRef?.current?.value;
    const confirmPassword: string | undefined =
      confirmPasswordRef?.current?.value;
    const birthdate: string | undefined = birthdateRef?.current?.value;
    const gender = genderRef?.current?.value;
    const race = raceRef?.current?.value;
    const maritalStatus = maritalStatusRef?.current?.value;
    const employmentStatus = employmentStatusRef?.current?.value;
    const educationLevel = educationLevelRef?.current?.value;
    const politicalAffiliation = politicalAffiliationRef?.current?.value;
    const region = regionRef?.current?.value;
    
    setLoading(true);

    // For dramatic effect
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (isEmpty('Email', email)) return;
    if (isEmpty('Password', password)) return;
    if (isEmpty('Confirm Password', confirmPassword)) return;
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (isEmpty('Birthdate', birthdate)) return;
    if (isEmpty('Gender', gender)) return;
    if (isEmpty('Race', race)) return;
    if (isEmpty('Marital Status', maritalStatus)) return;
    if (isEmpty('Employment Status', employmentStatus)) return;
    if (isEmpty('Education Level', educationLevel)) return;
    if (isEmpty('Political Affiliation', politicalAffiliation)) return;
    if (isEmpty('Urban/Rural Classification', region)) return;

    authContext
      ?.createUser(email!, password!)
      .then(async (userCredential: UserCredential) => {
        const bearerToken = await userCredential.user.getIdToken();

        if (!bearerToken) {
          toast.error('Failed to Sign up!');
          return;
        }

        const resp = await fetch(PROFILE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearerToken}`,
          },
          body: JSON.stringify({
            politicalAffiliation: politicalAffiliation,
          }),
        });

        if (!resp.ok) {
          toast.error('Failed to create profile!');
          return;
        }
        navigate('/');
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="signup">
      <div className="signup__content">
        <div className="signup__content__title">{APP_TITLE}</div>
        <form className="signup__content__form">
          <div className="signup__content__form__title">
            Sign up for a new account
          </div>
          <div className="margin-24" />
          {loading ? <BarLoader /> : (<>
      <FormField
        name="Email"
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
      <FormField
        name="Confirm Password"
        fieldType="password"
        autoComplete="new-password"
        required={true}
        ref={confirmPasswordRef}
      />
      <div className="margin-24" />
      <div className="margin-24" />
      <FormField
        name="Birthdate"
        fieldType="date"
        required={true}
        ref={birthdateRef}
      />
      <FormField
        name="Gender"
        fieldType="select"
        fieldOptions={['Male', 'Female', 'Non-binary', 'Other']}
        required={true}
        ref={genderRef}
      />
      <FormField
        name="Race"
        fieldType="select"
        fieldOptions={[
          'White',
          'Black or African American',
          'Hispanic or Latino',
          'Asian',
          'Native American or Alaska Native',
          'Native Hawaiian or Pacific Islander',
          'Multi-racial',
        ]}
        required={true}
        ref={raceRef}
      />
      <FormField
        name="Education Level"
        fieldType="select"
        fieldOptions={[
          'High school or equivalent',
          'Some college',
          "Associate's degree",
          "Bachelor's degree",
          "Master's degree",
          'Doctoral/Professional degree',
          'Trade/Technical school',
        ]}
        required={true}
        ref={educationLevelRef}
      />
      <FormField
        name="Employment Status"
        fieldType="select"
        fieldOptions={[
          'Full-time',
          'Part-time',
          'Self-employed',
          'Unemployed',
          'Student',
          'Retired',
          'Unable to work',
        ]}
        required={true}
        ref={employmentStatusRef}
      />
      <FormField
        name="Marital Status"
        fieldType="select"
        fieldOptions={['Single', 'Married', 'Divorced', 'Widowed', 'Partnered']}
        required={true}
        ref={maritalStatusRef}
      />
      <FormField
        name="Political Affiliation"
        fieldType="select"
        fieldOptions={[
          'Democrat',
          'Republican',
          'Independent',
          'Other',
          'Unaffiliated',
        ]}
        required={true}
        ref={politicalAffiliationRef}
      />
      <FormField
        name="Urban/Rural Classification"
        fieldType="select"
        fieldOptions={['Urban', 'Suburban', 'Rural', 'Small town']}
        required={true}
        ref={regionRef}
      />
      <div className="margin-24" />
      <Button
        classnames="primary-button"
        text="Sign Up"
        onClick={(e) => {
          setLoading(true);
          handleSignup(e);
        }}
      />
      <div className="margin-24" />
      <div className="signup__content__footer">
        <Link className="signup__content__footer--login-link" to="/login">
          Already have an account? Log in
        </Link>
      </div>
    </>)}
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
}
